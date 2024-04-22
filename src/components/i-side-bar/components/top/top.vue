<template>
  <div class="top">
    <div class="selected-count">
      已选中
      <span class="number"> {{ checkedCount }} </span>
      条
    </div>
    <div class="selected-all-root">
      <check-box @check="handleCheck" :checkedState="checkedState" />
    </div>
  </div>
</template>

<script setup name="top">
const props = defineProps({
  checkedCount: {
    type: Number,
    default: 0,
  },
  checkedState: {
    type: String,
    default: "none",
  },
});

const emit = defineEmits(["rootStateChange"]);

const handleCheck = (state) => {
  emit("rootStateChange", state);
};
</script>

<style scoped lang="less">
.top {
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .selected-count {
    line-height: 40px;
    font-size: 12px;
    color: #696d7a;
    .number {
      color: #2258f4;
    }
  }
  .selected-all-root {
  }
}
</style>
