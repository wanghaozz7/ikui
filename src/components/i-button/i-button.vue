<template>
  <button class="button" type="button" :class="getButtonClass">
    <span><slot /></span>
  </button>
</template>

<script setup name="i-button">
import { computed } from "vue";
const props = defineProps({
  type: {
    type: String,
    default: "normal",
  },
  size: {
    type: String,
    default: "medium",
  },
  round: {
    type: Boolean,
    default: false,
  },
});

const getButtonClass = computed(() => {
  return [props.type, props.size, props.round ? "round" : ""];
});
</script>

<style scoped lang="less">
.button {
  width: auto;
  padding: 10px 18px;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #606266;
  background: #fff;
  font-size: 14px;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #eee;
    transition: all 0.1s ease;
  }
}
.normal {
  background-color: #fff;
  color: #606266;
  border-color: #dcdfe6;
}
.info {
  background-color: rgba(187, 255, 255, 0.2);
  color: skyblue;
  border-color: rgba(135, 206, 235, 0.5);
  &:hover {
    background-color: skyblue;
    color: white;
  }
}
.warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
  &:hover {
    background-color: #e6a23c;
    color: white;
  }
}
.success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
  &:hover {
    background-color: #67c23a;
    color: white;
  }
}
.danger {
  background: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
  &:hover {
    background-color: #f56c6c;
    color: white;
  }
}
.large {
  padding: 12px 20px;
}
.medium {
  padding: 10px 16px;
}
.mini {
  padding: 3px 8px;
  height: 30px;
}
.round {
  border-radius: 20px;
}
</style>
