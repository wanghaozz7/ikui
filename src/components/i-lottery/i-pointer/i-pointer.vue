<template>
  <div class="pointer">
    <div class="circle"></div>
    <div class="triangle"></div>
  </div>
</template>
<script setup>
const msg = '111'
</script>
<style lang="less" scoped>
.pointer {
  position: relative;
  width: 75px;
  height: 75px;

  .circle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #eee;
    z-index: 99;
  }

  .triangle {
    position: absolute;
    width: 30px;
    height: 30px;
    top: calc(50% - 25px);
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: gold;
    clip-path: polygon(50% 0,0 50%,40% 50%,40% 100%,60% 100%,60% 50%,100% 50%);
  }
}
</style>