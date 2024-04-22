<template>
  <div style="margin-top: 50px" class="cont">
    <i-tooltip
      placement="top"
      content="我悬浮在上边~"
      :refreshTooltip="refreshTooltip"
    >
      <div class="item">上</div>
    </i-tooltip>
  </div>
  <div style="margin: 50px 0; gap: 150px" class="cont">
    <i-tooltip
      placement="left"
      content="我悬浮在左边~"
      :refreshTooltip="refreshTooltip"
    >
      <div class="item">左</div>
    </i-tooltip>
    <i-tooltip
      placement="right"
      content="我悬浮在右边~"
      :refreshTooltip="refreshTooltip"
    >
      <div class="item">右</div>
    </i-tooltip>
  </div>
  <div style="margin-bottom: 50px" class="cont">
    <i-tooltip
      placement="bottom"
      content="我悬浮在下边~"
      :refreshTooltip="refreshTooltip"
    >
      <div class="item">下</div>
    </i-tooltip>
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

<style scoped lang="less">
.tooltip-container {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .tooltip-content {
    border: 1px solid gray;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
  }
}

.item {
  width: 75px;
  height: 75px;
  border: 1px solid gray;
  margin: 100px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.cont {
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
