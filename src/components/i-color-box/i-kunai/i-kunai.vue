<template>
  <div class="kunai" :style="getVariable">
    <div class="circle"><div class="inner-circle" /></div>
    <div class="grip">
      <div class="bar" style="top: -4px; z-index: 4" />
      <div class="bar" style="top: 6px; z-index: 3" />
      <div class="bar" style="top: 16px; z-index: 2" />
    </div>
    <div class="knife"><div class="inner" /></div>
  </div>
</template>

<script setup name="i-kunai">
import { computed } from "vue";
const props = defineProps({
  color: {
    type: String,
    default: "gray",
  },
});

const getVariable = computed(() => {
  return {
    "--color": props.color,
  };
});
</script>

<style scoped lang="less">
.kunai {
  width: 60px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  transform: rotate(90deg) scale(0.7);
  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--color);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    // transform: skew(-5deg);
    .inner-circle {
      width: 10px;
      height: 10px;
      background-color: #fff;
      border-radius: 50%;
      transform: skew(5deg);
    }
  }
  .grip {
    position: relative;
    width: 15px;
    height: 24px;
    background-color: #eee;
    .bar {
      position: absolute;
      border-radius: 20px;
      width: 15px;
      height: 10px;
      background-color: #eee;
      border-bottom: 1px solid gray;
    }
  }
  .knife {
    width: 50px;
    height: 80px;
    background-color: var(--color);
    -webkit-clip-path: polygon(50% 0, 0 25%, 50% 100%, 100% 25%);
    position: relative;
    .inner {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
      -webkit-clip-path: polygon(50% 0, 0 25%, 55% 30%, 100% 25%, 50% 100%);
    }
  }
  &:hover {
    // transform: rotateY(180deg) translateY(50px);
  }
}
</style>
