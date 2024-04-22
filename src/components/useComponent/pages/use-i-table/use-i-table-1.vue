<template>
  <i-table :data="tableData" :out-side-border="false">
    <table-column prop="name" label="姓名" />
    <table-column prop="age" label="年龄" />
    <table-column prop="address" label="地址" />
  </i-table>
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
];
</script>
