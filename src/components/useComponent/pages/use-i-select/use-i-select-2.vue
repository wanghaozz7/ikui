<template>
  <div class="wrapper">
    <div class="row">
      <div class="text" style="font-size: 18px">较大尺寸(size=large) :</div>
      <i-select
        v-model="value"
        :option="option"
        size="large"
        placeholder="size = large <=> width = 360, height = 50"
      />
    </div>
    <div class="row">
      <div class="text">中等尺寸(size=medium) :</div>
      <i-select
        v-model="value"
        :option="option"
        size="medium"
        placeholder="width = 240, height = 35"
      />
    </div>
    <div class="row">
      <div class="text" style="font-weight: bolder">
        自定义尺寸(width:180,height:30) :
      </div>
      <i-select
        v-model="value"
        :option="option"
        :width="180"
        :height="30"
        placeholder="自定义大小"
      />
    </div>
    <div class="row">
      <div class="text" style="font-size: 14px">较小尺寸(size=mini) :</div>
      <i-select
        v-model="value"
        :option="option"
        size="mini"
        placeholder="120,25"
      />
    </div>
  </div>
</template>

<script setup>
let value = undefined;

const option = [
  {
    label: "桃子",
    value: "value-桃子",
  },
  {
    label: "香蕉",
    value: "value-香蕉",
  },
  {
    label: "苹果",
    value: "value-苹果",
  },
  {
    label: "橙子",
    value: "value-橙子",
  },
  {
    label: "葡萄",
    value: "value-葡萄",
  },
];
</script>

<style scoped lang="less">
.wrapper {
  padding: 20px;
  .row {
    height: 70px;
    display: flex;
    align-items: center;
    .text {
      margin-right: 20px;
      width: 300px;
      color: gray;
    }
  }
}
</style>
