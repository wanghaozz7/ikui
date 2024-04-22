<template>
  <div class="card">
    <div class="header">
      <slot name="header">
        <div class="text">{{ header }}</div>
      </slot>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script setup name="i-card">
const props = defineProps({
  header: {
    type: String,
    default: "我是标题",
  },
});
</script>

<style lang="less" scoped>
.card {
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 3px;

  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 258, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }

  .header {
    border-bottom: 1px solid #ebebeb;

    .text {
      line-height: 30px;
      font-size: 18px;
      padding: 12px;
    }
  }
}
</style>
