<template>
  <div
    class="arrow"
    @click="handleClick('goBack')"
    :style="getArrowStyle('left')"
  >
    <img src="@/assets/icons/arrow-left.svg" :style="getIconStyle('left')" />
  </div>
  <div
    class="arrow"
    @click="handleClick('goForward')"
    :style="getArrowStyle('right')"
  >
    <img src="@/assets/icons/arrow-right.svg" :style="getIconStyle('right')" />
  </div>
</template>

<script setup name="arrow-group">
import { computed } from "vue";
const props = defineProps({
  showArrow: {
    type: String,
    default: "hover",
  },
  isHover: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["goForward", "goBack"]);

const getArrowStyle = computed(() => {
  return (direction) => {
    let left, right;
    if (props.showArrow === "hover") {
      if (direction === "left") left = 5;
      else right = 5;
    } else {
      if (direction === "left") left = 15;
      else right = 15;
    }
    if (props.position === "outside") {
      if (direction === "left") left -= 58;
      else right -= 59;
    }
    if (direction === "left") left += "px";
    else right += "px";
    return {
      left,
      right,
    };
  };
});

const getIconStyle = computed(() => {
  return (direction) => {
    let display, transform, opacity;
    if (props.showArrow === "none") display = "none";
    else if (props.showArrow === "hover") {
      opacity = props.isHover ? 0.7 : 0;
      transform = props.isHover
        ? `translateX(${direction === "left" ? 10 : -10}px)`
        : "";
    } else {
      opacity = 0.7;
    }

    const padding =
      direction === "left" ? "3px 4px 3px 3px" : "3px 3px 3px 5px";
    return {
      padding,
      display,
      opacity,
      transform,
    };
  };
});

const handleClick = (type) => {
  emit(type);
};
</script>

<style scoped lang="less">
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  img {
    width: 33px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid rgb(189, 189, 189);
    background-color: #eee;
    transition: all 0.3s;
    cursor: pointer;
  }
}
</style>
