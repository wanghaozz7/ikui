<template>
  <div class="wrapper">
    <div class="block">
      <div class="text">light</div>
      <i-tooltip
        content="我是文字提示~"
        :refreshTooltip="refreshTooltip"
        theme="light"
        :offset="40"
      >
        <div class="item">我是文字内容</div>
      </i-tooltip>
    </div>
    <div class="block">
      <div class="text">dark</div>
      <i-tooltip
        content="我是文字提示~"
        :refreshTooltip="refreshTooltip"
        theme="dark"
        :offset="40"
      >
        <div class="item">我是文字内容</div>
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
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;

  .block {
    flex: 1;
    margin: 50px 120px;

    .text {
      width: 100%;
      font-size: 14px;
      color: gray;
      text-align: center;
      margin-bottom: 15px;
    }

    .item {
      width: 100%;
      height: 100px;
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
