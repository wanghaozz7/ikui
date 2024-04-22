<template>
  <i-tooltip
    content="我是文字提示~"
    :refreshTooltip="refreshTooltip"
    :openDelay="450"
  >
    <div class="item">我是文字内容</div>
  </i-tooltip>
</template>

<script setup>
const props = defineProps({
  refreshTooltip: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.item {
  width: 150px;
  height: 100px;
  margin: 70px auto;
  border: 1px solid #ebebeb;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
