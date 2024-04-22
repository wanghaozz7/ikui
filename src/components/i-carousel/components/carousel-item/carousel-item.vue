<template>
  <div class="carousel-item">
    <slot />
  </div>
</template>
<script setup name="carousel-item">
const msg = 11;
</script>

<style>
/* 穿透全局样式，因为循环需要生成前后的元素，scope会限制作用域 */
.carousel-item {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
