<template>
  <div>
    <div style="font-size: 14px; color: gray; margin: 20px 20px 0 20px">
      根据行的内容或者索引对特定行添加类名
    </div>
    <i-table
      :data="tableData"
      :out-side-border="false"
      :row-class-name="getRowClassName"
      border
    >
      <table-column prop="name" label="姓名" :width="180" />
      <table-column prop="age" label="年龄" :width="180" />
      <table-column prop="address" label="地址" :min-width="180" />
    </i-table>
    <div style="font-size: 14px; color: gray; margin: 20px 20px 0 20px">
      依照这个规则可以自己实现斑马纹
    </div>
    <i-table
      :data="tableData"
      :out-side-border="false"
      :row-class-name="getStripeClass"
      border
    >
      <table-column prop="name" label="姓名" :width="180" />
      <table-column prop="age" label="年龄" :width="180" />
      <table-column prop="address" label="地址" :min-width="180" />
    </i-table>
  </div>
</template>

<script setup>
const tableData = [
  {
    name: "小明",
    age: 19,
    address: "上海市静安区彭浦镇",
  },
  {
    name: "小明",
    age: 19,
    address: "上海市静安区彭浦镇",
  },
  {
    name: "小明",
    age: 19,
    address: "上海市静安区彭浦镇",
  },
  {
    name: "小明",
    age: 19,
    address: "上海市静安区彭浦镇",
  },
  {
    name: "小明",
    age: 19,
    address: "上海市静安区彭浦镇",
  },
];
const getRowClassName = (row, rowIndex) => {
  return {
    "warning-row": rowIndex % 2 === 0,
    "danger-row": rowIndex % 4 === 0,
  };
};
const getStripeClass = (row, rowIndex) => {
  return {
    "stripe-row": rowIndex % 2 !== 0,
  };
};
</script>

<style>
.warning-row {
  background-color: rgb(255, 228, 178);
}

.danger-row {
  background-color: rgb(249, 167, 167);
}

.stripe-row {
  background-color: #eee;
}
</style>
