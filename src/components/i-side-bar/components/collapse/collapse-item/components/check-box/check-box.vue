<template>
  <div
    class="checkBox"
    @click="handleClick"
    :class="{ active: checkedState === 'all' || checkedState === 'part' }"
  >
    <img src="./icon/checked.svg" v-show="checkedState === 'all'" />
    <img src="./icon/checked.svg" v-show="checkedState === 'none'" />
    <img src="./icon/partial_checked.svg" v-show="checkedState === 'part'" />
  </div>
</template>

<script setup name="check-box">
const props = defineProps({
  checkedState: {
    type: String,
    default: "none",
  },
});
const emit = defineEmits(["check"]);

const handleClick = () => {
  let newState;
  // 点击后变化
  // 全选 => 全都不选
  // 全都不选 => 全选
  // 部分选择 => 全选
  switch (props.checkedState) {
    case "all":
      newState = "none";
      break;
    case "part":
      newState = "all";
      break;
    case "none":
      newState = "all";
      break;
    default:
      newState = "none";
  }
  emit("check", newState);
};
</script>

<style scoped lang="less">
.checkBox {
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border-radius: 2px;
  overflow: hidden;
  border: 1px solid #bebebe;
  background-color: #fff !important;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 14px;
    height: 14px;
  }
  &.active {
    background-color: #2258f4 !important;
    border: 0px solid transparent !important;
  }
}
</style>
