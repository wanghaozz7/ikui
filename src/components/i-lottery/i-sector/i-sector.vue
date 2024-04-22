<template>
  <div id="sector" :style="getStyle">
    <div class="text" :style="textStyle">{{ title }}</div>
  </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  coordinate: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: ''
  },
  bgc: {
    type: String,
    default: '#ffffff'
  },
  title: {
    type: String,
    default: ''
  },
  translate: {
    type: Array,
    default() {
      return []
    }
  },
  beforeAngle: {
    type: Number,
    default: 0
  }
})

const getStyle = computed(() => {
  return {
    '--path': props.coordinate,
    '--bgc': props.bgc,

  }
})


const textStyle = computed(() => {
  return {
    // '--transform': `translate(${props.translate[0]}%,${props.translate[1]}%) rotate(${props.beforeAngle - 45}deg)`,
    '--left': `${props.translate[0]}%`,
    '--top': `${props.translate[1]}%`
  }
})

</script>
<style lang="less" scoped>
#sector {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  clip-path: var(--path);
  background: var(--bgc);
  position: relative;

  .text {
    width: auto;
    height: 100%;
    color: white;
    position: absolute;
    left: var(--left);
    top: var(--top);
    transform: var(--transform);
  }
}
</style>