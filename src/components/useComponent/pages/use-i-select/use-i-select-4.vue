<template>
  <div style="padding: 20px">
    <i-select v-model="value" :option="option" clearable @clear="handleClear" />
  </div>
</template>

<script setup>
let value = "value-桃子";

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

const handleClear = () => {
  console.log("handleClear");
};
</script>