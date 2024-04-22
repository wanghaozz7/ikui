<template>
  <div class="wrapper">
    <div class="row">
      <i-switch @change="handleChange" class="item" />
      <i-switch @change="handleChange" :width="120" :height="40" class="item" />
      <i-switch @change="handleChange" :width="150" :height="50" class="item" />
    </div>
  </div>
</template>

<script setup>
const handleChange = (value) => {
  console.log(value);
};
</script>

<style scoped lang="less">
.wrapper {
  padding: 20px;

  .row {
    display: flex;
    width: 100%;
    align-items: center;

    .item {
      flex: 1;
    }
  }
}
</style>
