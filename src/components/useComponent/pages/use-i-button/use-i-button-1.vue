<template>
  <div class="wrapper">
    <div class="row">
      <i-button @click="handleClick">默认按钮</i-button>
      <i-button @click="handleClick" type="info">信息按钮</i-button>
      <i-button @click="handleClick" type="success">成功按钮</i-button>
      <i-button @click="handleClick" type="warning">警告按钮</i-button>
      <i-button @click="handleClick" type="danger">危险按钮</i-button>
    </div>
    <div class="row">
      <i-button @click="handleClick" round>默认按钮</i-button>
      <i-button @click="handleClick" type="info" round>信息按钮</i-button>
      <i-button @click="handleClick" type="success" round>成功按钮</i-button>
      <i-button @click="handleClick" type="warning" round>警告按钮</i-button>
      <i-button @click="handleClick" type="danger" round>危险按钮</i-button>
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
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
