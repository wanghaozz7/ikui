<template>
  <i-table
    :data="tableData"
    :out-side-border="false"
    :cell-style="getCellStyle"
    :showHeader="false"
    border
  >
    <table-column prop="color1" label="color1" />
    <table-column prop="color2" label="color2" />
    <table-column prop="color3" label="color3" />
    <table-column prop="color4" label="color4" />
  </i-table>
</template>

<script setup>
const tableData = [
  {
    color1: "鸨色——#f7acbc",
    color2: "赤白橡——#deab8a",
    color3: "油色——#817936",
    color4: "绀桔梗——#444693",
  },
  {
    color1: "踯躅色——#ef5b9c",
    color2: "肌色——#fedcbd",
    color3: "伽罗色——#7f7522",
    color4: "花色——#2b4490",
  },
  {
    color1: "桜色——#feeeed",
    color2: "橙色——#f47920",
    color3: "青丹——#f47920",
    color4: "瑠璃色——#2a5caa",
  },
  {
    color1: "红绯——#ef4136",
    color2: "绿——#45b97c",
    color3: "江戸紫——#6f599c",
    color4: "牡丹色——#ea66a6",
  },
  {
    color1: "蒲公英色——#ffd400",
    color2: "勿忘草色——#7bbfea",
    color3: "黄茶——#de773f",
    color4: "绀青——#1b315e",
  },
];
const getCellStyle = (row, col, rowIndex, colIndex) => {
  const backgroundColor = col.split("——")[1];
  const color = "brown";
  const lineHeight = "35px";
  return {
    backgroundColor,
    color,
    lineHeight,
  };
};
</script>
