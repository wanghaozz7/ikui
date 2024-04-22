<template>
  <div class="wrapper">
    <div v-for="(item, idx) in name" :key="item" class="block">
      <i-button @click="handleClick(idx)" size="mini">{{ txt[idx] }}</i-button>
      <transition :name="item">
        <div class="content" v-show="show[idx]">{{ item }}</div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const show = reactive([]);
const txt = reactive([]);
let name = [
  "scale-in-out",
  "scale-rotate",
  "zoom-in-x",
  "zoom-in-y",
  "shrink-in-top",
  "shrink-in-bottom",
  "shrink-in-left",
  "shrink-in-right",
  "translate-right-down",
  "ease-in-out",
  "linear",
  "ease-in",
];

for (let idx in name) {
  show.push(true);
  txt.push("隐藏");
}

const handleClick = (idx) => {
  show[idx] = !show[idx];
  txt[idx] = show[idx] ? "隐藏" : "显示";
};
</script>

<style scoped lang="less">
.wrapper {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;

  .block {
    margin: 20px;
    width: 200px;
    height: 140px;

    .content {
      background: linear-gradient(Lightskyblue, skyblue, deepskyblue);
      color: #e6e6fa;
      font-family: Georgia, serif;
      font-style: italic;
      line-height: 30px;
      padding: 30px 10px;
      text-align: center;
      border-radius: 4px;
      margin-top: 10px;
    }
  }
}
</style>
