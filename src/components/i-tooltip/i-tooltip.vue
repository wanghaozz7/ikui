<template>
  <div ref="slotWrapper">
    <slot />
  </div>
  <div class="tooltip" ref="tooltip">
    <div class="content" :style="contentStyle">{{ content }}</div>
    <div class="icon">
      <div class="inner"></div>
    </div>
  </div>
</template>

<script setup name="i-tooltip">
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";

const props = defineProps({
  placement: {
    type: String,
    default: "top",
  },
  content: {
    type: String,
    default: "我是悬浮文字",
  },
  offset: {
    type: Number,
    default: 20,
  },
  openDelay: {
    type: Number,
    default: 0,
  },
  closeDelay: {
    type: Number,
    default: 350,
  },
  // light/dark
  theme: {
    type: String,
    default: "light",
  },
  // 如果使用了scroll-bar则需要在滚动的时候刷新tooltip的位置
  refreshTooltip: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["show", "close", "enter", "leave"]);

let showTooltip = ref(false);

let slotWidth,
  tooltipWidth,
  slotHeight,
  tooltipHeight,
  pos,
  winHeight = 0,
  openTimer,
  closeTimer;

const { proxy } = getCurrentInstance();
const innerIconColor = props.theme === "light" ? "#fff" : "#000";

const contentStyle = computed(() => {
  const backgroundColor = props.theme === "light" ? "#fff" : "#000";
  const color = props.theme === "light" ? "#000" : "#fff";
  return {
    backgroundColor,
    color,
  };
});

const styleFilter = (str) => {
  if (typeof str === "number") return str;
  return parseInt(str.replaceAll("px"));
};

const getTooltipAttr = () => {
  const tooltip = proxy.$refs.tooltip;
  const content = tooltip.children[0];
  const icon = tooltip.children[1];
  const inner = icon.children[0];
  const slot = proxy.$refs.slotWrapper.children[0];
  const pos = slot.getBoundingClientRect();
  const tooltipStyleArr = [];
  const iconStyleArr = [];
  const innerStyleArr = [];

  switch (props.placement) {
    case "top":
      // left = 相对left + (slot宽度 - tooltip宽度)/2
      // top = 相对top - (tooltip高度 + 固定值)
      tooltipStyleArr.push([
        "left",
        pos.left +
        (styleFilter(slotWidth) - styleFilter(tooltipWidth)) / 2 +
        "px",
      ]);
      tooltipStyleArr.push([
        "top",
        winHeight +
        pos.top -
        (styleFilter(tooltipHeight) + props.offset) +
        "px",
      ]);

      iconStyleArr.push(["left", "50%"]);
      iconStyleArr.push(["transform", "translateX(-50%)"]);
      iconStyleArr.push(["bottom", "-15px"]);
      iconStyleArr.push(["border-top-color", "black"]);

      innerStyleArr.push(["border-top-color", innerIconColor]);
      innerStyleArr.push(["bottom", "-6px"]);
      innerStyleArr.push(["left", "-7px"]);
      break;
    case "bottom":
      // left同上
      // top = 相对top + slot高度 + 固定值
      tooltipStyleArr.push([
        "left",
        pos.left +
        (styleFilter(slotWidth) - styleFilter(tooltipWidth)) / 2 +
        "px",
      ]);
      tooltipStyleArr.push([
        "top",
        winHeight + pos.top + styleFilter(slotHeight) + props.offset + "px",
      ]);
      tooltipStyleArr.push(["transform", "rotateX(180deg)"]);
      iconStyleArr.push(["left", "50%"]);
      iconStyleArr.push(["bottom", "-15px"]);
      iconStyleArr.push(["transform", "translateX(-50%)"]);
      iconStyleArr.push(["border-top-color", "black"]);

      innerStyleArr.push(["border-top-color", innerIconColor]);
      innerStyleArr.push(["bottom", "-6px"]);
      innerStyleArr.push(["left", "-7px"]);
      break;
    case "left":
      // left = 相对left - (tooltip宽度 + 固定值)
      // top = 相对top + (slot高度 - tooltip高度)/2
      tooltipStyleArr.push([
        "left",
        pos.left - (styleFilter(tooltipWidth) + props.offset) + "px",
      ]);
      tooltipStyleArr.push([
        "top",
        winHeight +
        pos.top +
        (styleFilter(slotHeight) - styleFilter(tooltipHeight)) / 2 +
        "px",
      ]);

      iconStyleArr.push(["right", "-15px"]);
      iconStyleArr.push(["top", "50%"]);
      iconStyleArr.push(["transform", "translateY(-50%)"]);
      iconStyleArr.push(["border-left-color", "black"]);

      innerStyleArr.push(["border-left-color", innerIconColor]);
      innerStyleArr.push(["bottom", "-7px"]);
      innerStyleArr.push(["left", "-8px"]);
      break;
    case "right":
      // left = 相对left + (slot宽度 + 固定值)
      // top = 同上

      tooltipStyleArr.push([
        "left",
        pos.left + styleFilter(slotWidth) + props.offset + "px",
      ]);
      tooltipStyleArr.push([
        "top",
        winHeight +
        pos.top +
        (styleFilter(slotHeight) - styleFilter(tooltipHeight)) / 2 +
        "px",
      ]);

      iconStyleArr.push(["left", "-15px"]);
      iconStyleArr.push(["top", "50%"]);
      iconStyleArr.push(["transform", "translateY(-50%)"]);
      iconStyleArr.push(["border-right-color", "black"]);

      innerStyleArr.push(["border-right-color", innerIconColor]);
      innerStyleArr.push(["bottom", "-7px"]);
      innerStyleArr.push(["left", "-6px"]);
      break;
    default:
      // left = 相对left + (slot宽度 - tooltip宽度)/2
      // top = 相对top - (tooltip高度 + 固定值)
      tooltipStyleArr.push([
        "left",
        pos.left +
        (styleFilter(slotWidth) - styleFilter(tooltipWidth)) / 2 +
        "px",
      ]);
      tooltipStyleArr.push([
        "top",
        winHeight +
        pos.top -
        (styleFilter(tooltipHeight) + props.offset) +
        "px",
      ]);

      iconStyleArr.push(["left", "50%"]);
      iconStyleArr.push(["transform", "translateX(-50%)"]);
      iconStyleArr.push(["bottom", "-15px"]);
      iconStyleArr.push(["border-top-color", "black"]);

      innerStyleArr.push(["border-top-color", "white"]);
      innerStyleArr.push(["bottom", "-6px"]);
      innerStyleArr.push(["left", "-7px"]);
  }

  proxy.$paintingStyle(tooltip, tooltipStyleArr, (key, value) => {
    if (key === "transform") content.style[key] = value;
  });
  proxy.$paintingStyle(icon, iconStyleArr);
  proxy.$paintingStyle(inner, innerStyleArr);
};

const handleMouseEnter = (e) => {
  emits("enter");
  clearTimeout(closeTimer);
  closeTimer = null;
  if (showTooltip.value) return;
  openTimer = setTimeout(() => {
    getTooltipAttr();
    const tooltip = proxy.$refs.tooltip;
    emits("show");
    tooltip.style.display = "block";
    showTooltip.value = true;
  }, props.openDelay);
};

const handleMouseLeave = (e) => {
  emits("leave");
  if (showTooltip.value) {
    const style = proxy.$refs.tooltip.style;
    closeTimer = setTimeout(() => {
      emits("close");
      style.display = "none";
      showTooltip.value = false;
    }, props.closeDelay);
  } else {
    clearTimeout(openTimer);
    openTimer = null;
  }
};

const handleScroll = (e) => {
  winHeight = e.target.scrollTop || document.documentElement.scrollTop;
};

onMounted(() => {
  const slot = proxy.$refs.slotWrapper.children[0];
  const tooltip = proxy.$refs.tooltip;
  pos = slot.getBoundingClientRect();

  slot && slot.addEventListener("mouseenter", handleMouseEnter);
  slot && slot.addEventListener("mouseleave", handleMouseLeave);

  const body = document.getElementsByTagName("body")[0];
  body.appendChild(tooltip);
  window.addEventListener("scroll", handleScroll, true);

  // 先获取属性再隐藏
  slotWidth = window.getComputedStyle(slot).width;
  tooltipWidth = window.getComputedStyle(tooltip).width;
  slotHeight = window.getComputedStyle(slot).height;
  tooltipHeight = window.getComputedStyle(tooltip).height;
  tooltip.style.display = "none";
});

onUnmounted(() => {
  const slotWrapper = proxy.$refs?.slotWrapper;
  const slot = slotWrapper ? slotWrapper.children[0] : undefined;
  slot && slot.removeEventListener("mouseenter", handleMouseEnter);
  slot && slot.removeEventListener("mouseleave", handleMouseLeave);
});

watch(
  () => props.refreshTooltip,
  (newValue, oldValue) => {
    getTooltipAttr();
  }
);
</script>

<style scoped lang="less">
.tooltip {
  position: absolute;

  .content {
    padding: 6px;
    line-height: 25px;
    white-space: nowrap;
    border: 1px solid black;
    border-radius: 4px;
    background-color: #fff;
  }

  .icon {
    position: absolute;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    z-index: 9999;

    .inner {
      position: absolute;
      width: 0;
      height: 0;
      border: 7.5px solid transparent;
      z-index: 9999;
    }
  }
}
</style>
