<template>
  <i-side-bar
    :sideBarData="treeData"
    showCheckBox
    @nodeCheckedChange="handleNodeCheckedChange"
    @checkedNodeArrayChange="handleCheckedNodeArrayChange"
  />
</template>

<script setup>
const treeData = [
  {
    label: "动物动物动物动物动物动物动物动物",
    id: "动物",
    children: [
      {
        label: "高等动物高等动物高等动物高等动物高等动物",
        id: "高等动物",
        children: [
          {
            label: "人类人类人类人类人类人类人类人类",
            id: "人类",
            children: [],
          },
        ],
      },
      {
        label: "低等动物",
        id: "低等动物",
        children: [
          {
            label: "猛禽",
            id: "猛禽",
            children: [
              {
                label: "游隼",
                id: "游隼",
                children: [],
              },
              {
                label: "金雕",
                id: "金雕",
                children: [],
              },
              {
                label: "虎头雕",
                id: "虎头雕",
              },
              {
                label: "角雕",
                id: "角雕",
              },
              {
                label: "食猿雕",
                id: "食猿雕",
              },
            ],
          },
          {
            label: "犬科",
            id: "犬科",
            children: [
              {
                label: "豺",
                id: "豺",
                children: [],
              },
              {
                label: "郊狼",
                id: "郊狼",
                children: [],
              },
              {
                label: "狼",
                id: "狼",
                children: [],
              },
              {
                label: "沙狐",
                id: "沙狐",
                children: [],
              },
            ],
          },
          {
            label: "猫科",
            id: "猫科",
            children: [
              {
                label: "豹",
                id: "豹",
                children: [],
              },
              {
                label: "虎",
                id: "虎",
                children: [],
              },
              {
                label: "狮",
                id: "狮",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "植物",
    id: "植物",
    children: [
      {
        label: "蔬菜",
        id: "蔬菜",
        children: [
          {
            label: "茄子",
            id: "茄子",
            children: [],
          },
          {
            label: "白菜",
            id: "白菜",
            children: [],
          },
          {
            label: "西红柿",
            id: "西红柿",
            children: [],
          },
          {
            label: "洋葱",
            id: "洋葱",
            children: [],
          },
        ],
      },
      {
        label: "水果",
        id: "水果",
        children: [
          {
            label: "芒果",
            id: "芒果",
            children: [],
          },
          {
            label: "水蜜桃",
            id: "水蜜桃",
            children: [],
          },
          {
            label: "苹果",
            id: "苹果",
            children: [],
          },
          {
            label: "番石榴",
            id: "番石榴",
            children: [],
          },
          {
            label: "西瓜",
            id: "西瓜",
            children: [],
          },
          {
            label: "火龙果",
            id: "火龙果",
            children: [],
          },
        ],
      },
    ],
  },
];

const handleNodeCheckedChange = (node) => {
  // console.log("nodeCheckedChange", node);
};

const handleCheckedNodeArrayChange = (arr) => {
  // console.log("handleCheckedNodeArrayChange", arr);
};
</script>
