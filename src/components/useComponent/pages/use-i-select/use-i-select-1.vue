<template>
  <div style="padding: 20px">
    <i-select
      :option="option"
      v-model="value"
      @select="handleSelect"
      @change="handleChange"
      @visibleChange="handleVisibleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
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

const handleSelect = (val) => {
  console.log("handleSelect", val, value);
};

const handleChange = (val) => {
  console.log("handleChange", val, value);
};

const handleVisibleChange = (visible) => {
  console.log("visibleChange", visible);
};

const handleFocus = () => {
  console.log("handleFocus");
};

const handleBlur = () => {
  console.log("handleBlur");
};
</script>