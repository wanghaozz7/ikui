<template>
  <div style="padding: 15px">
    <i-table
      :data="tableData1"
      out-side-border
      border
      :height="250"
      style="margin-bottom: 25px"
    >
      <table-column prop="name" label="姓名" />
      <table-column prop="age" label="年龄" />
      <table-column prop="address" label="地址" />
    </i-table>
    <i-table :data="tableData2" out-side-border border :height="250">
      <table-column prop="name" label="姓名" />
      <table-column prop="age" label="年龄" />
      <table-column prop="address" label="地址" />
    </i-table>
  </div>
</template>

<script setup>
const tableData1 = [
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
const tableData2 = [
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
