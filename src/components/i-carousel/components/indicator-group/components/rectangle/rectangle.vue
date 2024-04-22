<template>
  <div class="rectangle" :class="{ actived: isActive }" />
</template>

<script setup name="rectangle">
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="less">
.rectangle {
  width: 30px;
  height: 7px;
  background-color: #e3ddd3;
  margin: 0 5px;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background-color: #a7aba4;
  }
}

.actived {
  background-color: #969c92;
}
</style>
