<template>
  <div class="wrapper">
    <div class="btn" @click="handleClick(item)" v-for="item in arr" :key="item">
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const handleClick = (type) => {
  proxy.$message({
    info: "消息提示",
    type,
  });
};

const arr = ["success", "error", "warning", "info"];
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
    margin: auto;
    cursor: pointer;

    &:hover {
      border-color: lightblue;
      color: skyblue;
    }
  }
}
</style>
