<template>
  <div class="dot" :class="{ actived: isActive }" />
</template>

<script setup name="dot">
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="less">
.dot {
  width: 12px;
  height: 12px;
  background-color: #efe7e7;
  border-radius: 50%;
  margin: 0 5px;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 123, 255, 0.514);
  }
}

.actived {
  background-color: #007aff;
}
</style>
