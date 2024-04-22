<template>
  <div>
    <div class="row">
      <div class="col">
        <i-table :data="tableData" :out-side-border="false" size="small" border>
          <table-column prop="name" label="姓名" />
          <table-column prop="age" label="年龄" />
          <table-column prop="address" label="地址" />
        </i-table>
      </div>
      <div class="col">
        <i-table
          :data="tableData"
          :out-side-border="false"
          size="medium"
          border
        >
          <table-column prop="name" label="姓名" />
          <table-column prop="age" label="年龄" />
          <table-column prop="address" label="地址" />
        </i-table>
      </div>
    </div>
    <div>
      <i-table :data="tableData" :out-side-border="false" size="big" border>
        <table-column prop="name" label="姓名" />
        <table-column prop="age" label="年龄" />
        <table-column prop="address" label="地址" />
      </i-table>
    </div>
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
];
</script>

<style scoped lang="less">
.row {
  display: flex;

  .col {
    flex: 1;
  }
}
</style>
