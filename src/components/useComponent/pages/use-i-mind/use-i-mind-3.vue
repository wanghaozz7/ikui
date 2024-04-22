<template>
  <i-mind
    :tree="tree"
    @treeChange="handleTreeChange"
    :maxWidth="1014"
    ligatureType="curve"
    defaultStrokeStyle="#000"
    hoverStrokeStyle="lightgreen"
    :ligatureLineWidth="5"
    ligatureStrokeStyle="pink"
    :buttonRadius="15"
    buttonBackgroundColor="yellow"
    nodeInDragFillStyle="#eee"
    nodeInDragStrokeStyle="#eee"
  />
</template>

<script setup>
let tree = {
  label: "植物",
  id: "植物",
  children: [
    {
      label: "水果",
      id: "水果",
      children: [
        {
          label: "苹果 🍎",
          id: "苹果",
        },
        {
          label: "香蕉 🍌",
          id: "香蕉",
          children: [
            {
              label: "猕猴桃 🥝",
              id: "猕猴桃",
            },
            {
              label: "奇异果 🥝",
              id: "奇异果",
            },
          ],
        },
        {
          label: "橙子 🍊",
          id: "橙子",
        },
      ],
    },
    {
      label: "蔬菜",
      id: "蔬菜",
      children: [
        {
          label: "白菜",
          id: "白菜",
        },
        {
          label: "西红柿 🍅",
          id: "西红柿",
          children: [
            {
              label: "番茄",
              id: "番茄",
            },
            {
              label: "柿子",
              id: "柿子",
            },
          ],
        },
        {
          label: "茄子 🍆",
          id: "茄子",
        },
      ],
    },
  ],
};
const handleTreeChange = (newTree) => {
  tree = newTree;
  console.log(tree);
};
</script>
