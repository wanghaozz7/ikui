<template>
  <div class="wrapper">
    <div class="block" v-for="val in arr" :key="val">
      <i-tooltip
        content="我是文字提示~"
        :refreshTooltip="refreshTooltip"
        :offset="val"
      >
        <div class="item">{{ val }}</div>
      </i-tooltip>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  refreshTooltip: {
    type: Boolean,
    default: false,
  },
});
const arr = [20, 30, 40, 50, 60, 70, 80];
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;

  .block {
    flex: 1;
    margin: 120px 20px 50px 20px;

    .item {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 1px solid #ebebeb;
      border-radius: 2px;
    }
  }
}
</style>
