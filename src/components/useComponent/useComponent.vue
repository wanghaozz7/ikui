<template>
  <div class="container">
    <div class="title">{{ title.text }}</div>
    <div class="desc">{{ title.desc }}</div>
    <slot />
    <attribute-list
      v-for="list in lists"
      :key="list.title"
      :title="list.title"
      :list-data="list.listData"
      :type="list.type"
    />
  </div>
</template>

<script setup name="use-component">
// 使用组件由以下组成 ： 1.组件名（一级标题）+ 描述  2.使用方法 (二级标题) + 描述 + showComponent (样式展示 + 代码) 3.接口列表

const props = defineProps({
  title: {
    type: Object,
    default() {
      return {};
    },
  },
  lists: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>

<style lang="less" scoped>
.container {
  padding: 60px;
  width: 100%;

  .title {
    font-size: 26px;
  }

  .desc {
    font-size: 14px;
    color: gray;
    margin: 15px 0;
  }
}
</style>
