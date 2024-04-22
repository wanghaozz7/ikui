<template>
  <div class="carousel-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="carousel" ref="carousel" v-resize:20="onResize">
      <div class="carousel-body" :style="getCarouselBodyStyle">
        <slot />
      </div>
    </div>
    <arrow-group :showArrow="showArrow" :isHover="isHover" :position="arrowPosition" @goForward="handleGoForward"
      @goBack="handleGoBack" />
    <indicator-group :indicatorCount="itemCount" :activeIdx="getActiveIdx" :trigger="trigger"
      :position="indicatorPosition" :indicatorType="indicatorType" @change="handleChange" />
  </div>
</template>

<script setup name="i-carousel">
import { ref, onMounted, onUnmounted, getCurrentInstance, computed } from "vue";

const emits = defineEmits(["change", "changeAfterAnimation"]);

const props = defineProps({
  // 是否循环滚动
  circular: {
    type: Boolean,
    default: false,
  },
  // 是否自动滚动
  autoRolling: {
    type: Boolean,
    default: false,
  },
  // 自动滚动间隔
  interval: {
    type: Number,
    default: 3000,
  },
  // 滚动一次的延迟 (ms)
  delay: {
    type: Number,
    default: 150,
  },
  // 动画的帧数
  frame: {
    type: Number,
    default: 50,
  },
  // 触发方式 (hover,click)
  trigger: {
    type: String,
    default: "hover",
  },
  // 箭头显示方式 (hover,none,always)
  showArrow: {
    type: String,
    default: "always",
  },
  // 箭头位置 (inside,ouside)
  arrowPosition: {
    type: String,
    default: "inside",
  },
  // 指示器类型 (dot,rectangle)
  indicatorType: {
    type: String,
    default: "dot",
  },
  // 指示器位置 (inside,outside)
  indicatorPosition: {
    type: String,
    default: "inside",
  },
});

let offset = ref(0),
  curIdx = ref(0),
  isMoving = ref(false),
  isHover = ref(false);

let itemCount,
  carouselWidth,
  autoRollingInterval = null,
  hourglass = 0,
  forward = true,
  carousel,
  carousel_body,
  carousel_item;

const { proxy } = getCurrentInstance(),
  interval = props.delay / props.frame;

const getActiveIdx = computed(() => {
  if (!props.circular) return curIdx.value;
  return curIdx.value - 1;
});
const getCarouselBodyStyle = computed(() => {
  const left = offset.value + "px";
  return {
    left,
  };
});

const getOffsetByIdx = (idx) => {
  return Math.abs(idx * carouselWidth) * -1;
};
const preCirculation = () => {
  // 在首位添加一个末位元素 在末位添加一个首位元素
  let el = ``,
    t = ``;
  //在首部添加尾元素
  el += `<div class='carousel-item'>${carousel_item[itemCount - 1].innerHTML
    }</div>`;
  for (let tmp of carousel_item) {
    t = `<div class="carousel-item">${tmp.innerHTML}</div>`;
    el += t;
  }
  //在尾部添加首元素
  el += `<div class='carousel-item'>${carousel_item[0].innerHTML}</div>`;
  //重新设置body的HTML
  carousel_body.innerHTML = el;

  // 重置下标范围   curIdx:1 ~ itemCount+1    偏移量范围 offset:carouselWidth*-1 ~ itemCount*carouselWidth*-1
  offset.value = carouselWidth * -1; // 默认偏移量更改
  curIdx.value = 1; // 默认下标更改
};
const renderMove = (targetIdx) => {
  if (isMoving.value) return;
  isMoving.value = true;
  const dif = Math.abs(curIdx.value - targetIdx);
  // 单次滚动
  if (dif === 1) {
    // 非循环滚动模式下 到达边界向反方向滚动一格 (如果是自动滚动则反向改变)
    if (!props.circular && (targetIdx === itemCount || targetIdx === -1)) {
      isMoving.value = false;
      if (targetIdx === itemCount) renderMove(targetIdx - 2);
      else renderMove(1);
      return;
    }
    const targetOffset = getOffsetByIdx(targetIdx);
    const offsetDif = targetOffset - offset.value;
    const step = Math.ceil(offsetDif / props.frame);
    const callBack = function () {
      offset.value = targetOffset;
      curIdx.value = targetIdx;
      if (props.circular) {
        if (targetIdx === itemCount + 1) {
          // 循环滚动超出范围
          curIdx.value = 1;
          offset.value = getOffsetByIdx(curIdx.value);
        } else if (targetIdx === 0) {
          curIdx.value = itemCount;
          offset.value = getOffsetByIdx(curIdx.value);
        }
      }
      isMoving.value = false;
    };
    moveAnimate(step, targetOffset, targetIdx, callBack);
  } else {
    // 跳跃滚动
    // 两个idx的差值大于等于1 代表至少中间有一块 滚动时将两个idx之间的块全部隐藏(与循环同理,使我们的闪现不被看出来)
    // 用一半的时间滚动到第一个隐藏块 然后闪现到最后一个隐藏块 用另一半时间滚动到目标块
    let l, r, firstIdx, lastIdx;
    if (targetIdx > curIdx.value) {
      l = curIdx.value;
      r = targetIdx;
      firstIdx = l + 1;
      lastIdx = r - 1;
    } else {
      l = targetIdx;
      r = curIdx.value;
      firstIdx = r - 1;
      lastIdx = l + 1;
    }
    // 将之间的内容隐藏
    for (let i = l + 1; i < r; i++) carousel_item[i].style.opacity = 0;
    // 执行第一次滚动 到达第一个隐藏块
    const firstOffset = getOffsetByIdx(firstIdx);
    const fitstOffsetDif = firstOffset - offset.value;
    const fitstStep = Math.ceil(fitstOffsetDif / props.frame) * 2; // 步长翻倍时间减半
    const callBack = function () {
      // 执行完毕后闪现到最后一个隐藏块
      const lastOffset = getOffsetByIdx(lastIdx);
      offset.value = lastOffset;

      // 从最后一个隐藏块到目标块
      const targetOffset = getOffsetByIdx(targetIdx);
      const offsetDif = targetOffset - offset.value;
      const step = Math.ceil(offsetDif / props.frame) * 2; // 步长翻倍时间减半
      const innerCallBack = function () {
        // 到达目标块后将隐藏的内容显示
        for (let i = l + 1; i < r; i++) carousel_item[i].style.opacity = 1;
        offset.value = targetOffset;
        curIdx.value = targetIdx;
        if (props.circular) {
          if (targetIdx === itemCount + 1) {
            // 循环滚动超出范围
            curIdx.value = 1;
            offset.value = getOffsetByIdx(curIdx.value);
          } else if (targetIdx === 0) {
            curIdx.value = itemCount;
            offset.value = getOffsetByIdx(curIdx.value);
          }
        }
        isMoving.value = false;
      };
      moveAnimate(step, targetOffset, targetIdx, innerCallBack);
    };
    moveAnimate(fitstStep, firstOffset, firstIdx, callBack);
  }
  let pre, cur;
  if (props.circular) {
    pre = curIdx.value - 1;
    cur =
      targetIdx - 1 === itemCount
        ? 0
        : targetIdx - 1 === -1
          ? itemCount - 1
          : targetIdx - 1;
  } else {
    pre = curIdx.value;
    cur = targetIdx;
  }
  emits("change", pre, cur);
};
const moveAnimate = (step, targetOffset, targetIdx, callBack = () => { }) => {
  offset.value += step;
  // 到达终点 => 处理状态
  if (
    (step > 0 && offset.value >= targetOffset) ||
    (step < 0 && offset.value <= targetOffset)
  ) {
    let pre, cur;
    if (props.circular) {
      pre = curIdx.value - 1;
      cur =
        targetIdx - 1 === itemCount
          ? 0
          : targetIdx - 1 === -1
            ? itemCount - 1
            : targetIdx - 1;
    } else {
      pre = curIdx.value;
      cur = targetIdx;
    }
    emits("changeAfterAnimation", pre, cur);

    callBack();
    return;
  }
  // 未到达终点 => 继续滚动
  setTimeout(() => {
    moveAnimate(step, targetOffset, targetIdx, callBack);
  }, interval);
};
const intervalRolling = () => {
  // 判断元素是否在可视范围内和浏览器是否休眠
  if (webIsActive() || isInViePortOfOne(carousel)) {
    // 将时间间隔分为10份,当第十次时触发滚动并清除沙子 通过沙漏中的沙子实现计时器的暂停和继续
    hourglass += props.interval / 10;
    if (hourglass === props.interval) {
      if (!props.circular) {
        if (forward) {
          if (curIdx.value === itemCount - 1) {
            forward = !forward;
            handleGoBack();
          } else handleGoForward();
        } else {
          if (curIdx.value === 0) {
            forward = !forward;
            handleGoForward();
          } else handleGoBack();
        }
      } else {
        if (forward) handleGoForward();
        else handleGoBack();
      }
      hourglass = 0;
    }
  }
};
const setAutoRollingInterval = () => {
  if (props.autoRolling && autoRollingInterval === null) {
    autoRollingInterval = setInterval(() => {
      intervalRolling();
    }, props.interval / 10);
  }
};
const clearAutoRollingInterval = () => {
  if (props.autoRolling && autoRollingInterval !== null) {
    window.clearInterval(autoRollingInterval);
    autoRollingInterval = null;
  }
};
// 浏览器是否休眠
const webIsActive = () => {
  let bowhidden =
    "hidden" in document
      ? "hidden"
      : "webkithidden" in document
        ? "webkithidden"
        : "mozhidden" in document
          ? "mozhidden"
          : null;
  let vibchage =
    "visibilitychange" || "webkitvisibilitychange" || "mozvisibilitychange";
  document.addEventListener(vibchage, function () {
    if (!document[bowhidden]) return true;
    else return false;
  });
};
// 元素是否处于可视区域内
const isInViePortOfOne = (el) => {
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const offsetTop = el.offsetTop;
  const scollTop = document.documentElement.scrollTop;
  const top = offsetTop - scollTop;
  return top <= viewPortHeight && top >= 0;
};
const handleGoForward = () => renderMove(curIdx.value + 1);
const handleGoBack = () => renderMove(curIdx.value - 1);
const handleChange = (idx) => renderMove(props.circular ? idx + 1 : idx);
const handleMouseEnter = () => {
  isHover.value = true;
  clearAutoRollingInterval();
};
const handleMouseLeave = () => {
  isHover.value = false;
  setAutoRollingInterval();
};
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
const onResize = (arg) => {
  const height = arg[0].contentRect.height;
  const width = arg[0].contentRect.width;
  if (width != 0 && height != 0) getAttr();
};
const getAttr = () => {
  // 获取属性
  carousel = proxy.$refs.carousel;
  carouselWidth = carousel.offsetWidth;

  // 重置下标范围   curIdx:1 ~ itemCount+1    偏移量范围 offset:carouselWidth*-1 ~ itemCount*carouselWidth*-1
  if (props.circular) {
    offset.value = carouselWidth * -1; // 默认偏移量更改
    curIdx.value = 1; // 默认下标更改
  }
};

onMounted(() => {
  carousel = proxy.$refs.carousel;
  carousel_body = carousel.children[0];
  carousel_item = carousel_body.children;
  carouselWidth = carousel.offsetWidth;
  itemCount = carousel_item.length;

  if (props.circular) preCirculation();
  if (props.autoRolling) setAutoRollingInterval();
});

onUnmounted(() => {
  if (props.autoRolling) clearAutoRollingInterval();
});
</script>

<style scoped lang="less">
.carousel-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .carousel {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .carousel-body {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
    }
  }
}
</style>
