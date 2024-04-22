<template>
  <div class="wrapper">
    <div class="row">
      <i-button @click="handleClick" size="large">默认按钮</i-button>
      <i-button @click="handleClick">默认按钮</i-button>
      <i-button @click="handleClick" size="mini">默认按钮</i-button>
    </div>
    <div class="row">
      <i-button @click="handleClick" round size="large">默认按钮</i-button>
      <i-button @click="handleClick" round>默认按钮</i-button>
      <i-button @click="handleClick" round size="mini">默认按钮</i-button>
    </div>
  </div>
</template>

<script setup>
const handleClick = (e) => {
  console.log("e", e);
};
</script>

<style scoped lang="less">
.wrapper {
  padding: 20px;
  .row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    align-items: center;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
