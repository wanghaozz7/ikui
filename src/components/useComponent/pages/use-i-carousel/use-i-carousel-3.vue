<template>
  <div class="carousel-container">
    <div class="block">
      <div class="text">使用click触发</div>
      <i-carousel trigger="click">
        <carousel-item v-for="color in colorList" :key="color">
          <div class="carousel-item" :style="{ background: color }" />
        </carousel-item>
      </i-carousel>
    </div>
    <div class="block">
      <div class="text">使用hover触发</div>
      <i-carousel trigger="hover">
        <carousel-item v-for="color in colorList" :key="url">
          <div class="carousel-item" :style="{ background: color }" />
        </carousel-item>
      </i-carousel>
    </div>
  </div>
</template>

<script setup>
const colorList = [
  "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)",
  "linear-gradient(to right, #fc5c7d, #6a82fb)",
  "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
  "linear-gradient(to right, #007991, #78ffd6)",
  "linear-gradient(to right, #ee9ca7, #ffdde1)",
];
</script>

<style scoped lang="less">
.carousel-container {
  height: 250px;
  margin: 50px;
  display: flex;

  .block {
    flex: 1;
    margin: 15px;

    .text {
      font-size: 14px;
      color: gray;
      text-align: center;
      margin-bottom: 10px;
    }

    .carousel-item {
      width: 100%;
      height: 100%;
      font-size: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}</style>
