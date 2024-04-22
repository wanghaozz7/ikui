<template>
  <div class="wrapper">
    <div class="btn" @click="handleClick">打开消息提示</div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const handleClick = (e) => {
  proxy.$message({
    info: "这是一段默认的消息提示",
  });
};
</script>

<style scoped lang="less">
.wrapper {
  height: 150px;
  display: flex;
  align-items: center;
  margin-left: 20px;

  .btn {
    line-height: 25px;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 2px;
    cursor: pointer;

    &:hover {
      border-color: lightblue;
      color: skyblue;
    }
  }
}
</style>
