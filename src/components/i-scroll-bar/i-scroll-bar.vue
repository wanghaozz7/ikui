<template>
  <div class="scroll-bar-wrapper" :style="getScrollBarWrapperStyle" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave" @mousewheel.passive="handleScroll" ref="scroll">
    <div ref="slot" :style="getSlotStyle" v-resize:20="onResize">
      <slot />
    </div>
    <div class="scroll-bar" :style="getScrollBarStyle" ref="scrollBar" v-if="showScrollBarWhen !== 'none'"></div>
  </div>
</template>

<script setup name="i-scroll-bar">
import { getCurrentInstance, ref, computed, onMounted } from "vue";

const props = defineProps({
  // 最大高度 超出后显示滚动条
  maxHeight: {
    type: String,
    default: "100vh",
  },
  // 滚动一次的帧数
  frame: {
    type: Number,
    default: 20,
  },
  // 总延迟 (delay = frame * 执行一次动画后的延迟)
  delay: {
    type: Number,
    default: 100,
  },
  // 滚动条出现的时机
  showScrollBarWhen: {
    type: String,
    default: "hover",
  },
});

const emits = defineEmits(["offsetChange"]);

// 只需要控制内容的偏移量(slotOffset) 滚动条的offset只是展示 通过计算生成
let slotOffset = ref(0),
  scrollBarOffset = ref(0),
  showScrollBar = ref(false),
  scrollBarLen = ref(0),
  isMove = ref(false),
  isDrag = ref(false),
  isHover = ref(false);

let slotMaxOffset, slotHeight, wrapperHeight, y;
// 提取出动画的参数是为了修改滚动的速度(所以其他变量不能随意使用newSlotOffset)
let step, newSlotOffset, delay;
const { proxy } = getCurrentInstance();

const getScrollBarWrapperStyle = computed(() => {
  const maxHeight = props.maxHeight;
  // 拖动时不高亮选中文本
  const userSelect = isDrag.value ? "none" : "";

  return {
    maxHeight,
    userSelect,
  };
});

const getSlotStyle = computed(() => {
  const transform = `translateY(-${slotOffset.value}px)`;
  // 滚动时将回调发出
  emits("offsetChange", slotOffset.value);

  return {
    transform,
  };
});

const getScrollBarStyle = computed(() => {
  // 滚动条走的距离 = 内容走的距离 *（盒子的长度 - 滚动条的长度）/（内容的长度 - 盒子的长度）
  const height = scrollBarLen.value + "px";
  const backgroundColor = isDrag.value ? "#d1d1d1" : "";
  scrollBarOffset.value =
    (slotOffset.value * (wrapperHeight - scrollBarLen.value)) /
    (slotHeight - wrapperHeight);
  const top = scrollBarOffset.value + "px";
  const transition = isDrag.value ? "" : "all 0.2s";
  let opacity;
  const display = showScrollBar.value ? "block" : "none";
  switch (props.showScrollBarWhen) {
    case "always":
      opacity = "1";
      break;
    case "none":
      opacity = "0";
      break;
    case "hover":
      opacity = isHover.value || isDrag.value ? "1" : "0";
      break;
    default:
      opacity = isHover.value || isDrag.value ? "1" : "0";
  }

  return {
    display,
    height,
    top,
    backgroundColor,
    opacity,
    transition,
  };
});

// 自定义指令处理slot高度
const vResize = {
  mounted(el, binding) {
    // 这里使用debounce防抖处理，防抖的延时时间可以通过自定义指令的参数传过来，如`v-resize:300`表示300ms延时
    // 也可以将此处延时去掉，放在绑定的函数中自定义
    function debounce(fn, delay = 16) {
      let t = null;
      return function () {
        if (t) {
          clearTimeout(t);
        }
        const context = this;
        const args = arguments;
        t = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }
    el._resizer = new window.ResizeObserver(
      debounce(binding.value, Number(binding.arg) || 16)
    );
    el._resizer.observe(el);
  },
  unmounted(el) {
    el._resizer.disconnect();
  },
};

// slot高度变化回调
const onResize = (arg) => {
  slotHeight = filterString(arg[0].contentRect.height);
  getAttr();
};

// 获取所有属性
const getAttr = () => {
  const wrapper = proxy.$refs.slot.parentNode;
  wrapperHeight = filterString(window.getComputedStyle(wrapper).height);
  if (slotHeight > wrapperHeight) showScrollBar.value = true;
  else showScrollBar.value = false;

  // 如果出现了滚动条 —— 滚动条的长度 计算滚动范围
  if (showScrollBar.value) {
    // 滚动条长度 = （盒子的长度 / 内容的长度）* 盒子的长度
    scrollBarLen.value = (wrapperHeight * wrapperHeight) / slotHeight;
    slotMaxOffset = slotHeight - wrapperHeight;
  }
  // 重置slotOffset
  if (slotOffset.value > slotMaxOffset) slotOffset.value = slotMaxOffset;
  else if (slotOffset.value < 0) slotOffset.value = 0;
};

// 添加滚动条拖动事件
const mouseDownAndMove = (el, callback) => {
  // 添加鼠标按下监听
  el.addEventListener("mousedown", function () {
    // 当鼠标按下时, 添加鼠标移动监听
    y = 0;
    isDrag.value = true;
    document.addEventListener("mousemove", callback);
  });
  // 添加鼠标弹起监听 , 即鼠标不在按下
  document.addEventListener("mouseup", function () {
    // 此时移除 鼠标移动监听,移除指定 事件函数
    isDrag.value = false;
    document.removeEventListener("mousemove", callback);
  });
};

// 处理滚动条拖动事件
const handleMouseDownAndMove = (e) => {
  if (y === 0) y = e.y;
  else {
    const change = e.y - y;
    const newVal = scrollBarOffset.value + change;
    // 内容走的距离 = 滚动条走的距离 *（内容的长度 - 盒子的长度）/（盒子的长度 - 滚动条的长度）
    const target =
      (newVal * (slotHeight - wrapperHeight)) /
      (wrapperHeight - scrollBarLen.value);
    handleDrag(target);
    y = e.y;
  }
};

const filterString = (str) => {
  if (typeof str === "number") return str;
  return parseInt(str.replaceAll("px"));
};

// 滚轮滚动
const handleScroll = (e) => {
  if (!showScrollBar.value) return false;
  const change = e.deltaY;
  const target = slotOffset.value + change;
  if (target >= 0 && target <= slotMaxOffset) scrollAnimate(change);
  else {
    if (change >= 0) scrollAnimate(slotMaxOffset - slotOffset.value);
    else scrollAnimate(-slotOffset.value);
  }
  return false;
};

// 鼠标拖拽
const handleDrag = (target) => {
  if (target >= 0 && target <= slotMaxOffset) slotOffset.value = target;
};

const handleMouseEnter = (e) => (isHover.value = true);

const handleMouseLeave = (e) => (isHover.value = false);
// 执行滚动动画
const scrollAnimate = (change) => {
  if (change === 0) return;
  const moveAnimate = () => {
    if (
      (step > 0 && slotOffset.value >= newSlotOffset) ||
      (step < 0 && slotOffset.value <= newSlotOffset)
    ) {
      slotOffset.value = newSlotOffset;
      isMove.value = false;
      return;
    }
    slotOffset.value += step;
    setTimeout(() => {
      moveAnimate();
    }, delay);
  };
  delay = props.delay / props.frame;
  if (isMove.value) {
    // 快速滚动从上一次的目标继续累加(滚动条处于动态)
    newSlotOffset += change;
    // 重置范围
    newSlotOffset = newSlotOffset > 0 ? newSlotOffset : 0;
    newSlotOffset =
      newSlotOffset < slotMaxOffset ? newSlotOffset : slotMaxOffset;
    step = (newSlotOffset - slotOffset.value) / props.frame;
  } else {
    // 普通滚动从当前滚动条的位置进行滚动(滚动条处于静态)
    step = change / props.frame;
    newSlotOffset = change + slotOffset.value;
    isMove.value = true;
    moveAnimate();
  }
};

onMounted(() => {
  if (props.showScrollBarWhen !== "none") {
    const scrollBar = proxy.$refs.scrollBar;
    mouseDownAndMove(scrollBar, handleMouseDownAndMove);
  }
});
</script>

<style scoped lang="less">
.scroll-bar-wrapper {
  position: relative;
  overflow: hidden;

  .scroll-bar {
    position: absolute;
    height: 100%;
    width: 8px;
    border-radius: 8px;
    right: 0;
    top: 0;
    cursor: pointer;
    background-color: #ebebeb;
    z-index: 99;

    &:hover {
      background-color: #d1d1d1;
    }
  }
}
</style>
