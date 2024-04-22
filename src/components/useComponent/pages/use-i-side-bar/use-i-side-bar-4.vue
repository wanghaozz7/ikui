<template>
  <i-side-bar
    :sideBarData="treeData"
    :nodeStyle="nodeStyle"
    :rowHeight="40"
    showCheckBox
    @nodeCheckedChange="handleNodeCheckedChange"
    @checkedNodeArrayChange="handleCheckedNodeArrayChange"
  />
</template>

<script setup>
const treeData = [
  {
    label: "Animal",
    id: "Animal",
    children: [
      {
        label: "Higher animals",
        id: "Higher animals",
        children: [
          {
            label: "Human",
            id: "Human",
            children: [],
          },
        ],
      },
      {
        label: "Lower animal",
        id: "Lower animal",
        children: [
          {
            label: "Raptor",
            id: "Raptor",
            children: [
              {
                label: "Peregrine falcon",
                id: "Peregrine falcon",
                children: [],
              },
              {
                label: "Golden eagle",
                id: "Golden eagle",
                children: [],
              },
              {
                label: "Tiger headed eagle",
                id: "Tiger headed eagle",
              },
              {
                label: "Horn carving",
                id: "Horn carving",
              },
              {
                label: "Pithecophaga jefferyi",
                id: "Pithecophaga jefferyi",
              },
            ],
          },
          {
            label: "Canidae",
            id: "Canidae",
            children: [
              {
                label: "Jackal",
                id: "Jackal",
                children: [],
              },
              {
                label: "Coyote",
                id: "Coyote",
                children: [],
              },
              {
                label: "Wolf",
                id: "Wolf",
                children: [],
              },
              {
                label: "Corsac",
                id: "Corsac",
                children: [],
              },
            ],
          },
          {
            label: "Felidae",
            id: "Felidae",
            children: [
              {
                label: "Leopard",
                id: "Leopard",
                children: [],
              },
              {
                label: "Tiger",
                id: "Tiger",
                children: [],
              },
              {
                label: "Lion",
                id: "Lion",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Plant",
    id: "Plant",
    children: [
      {
        label: "Vegetable",
        id: "Vegetable",
        children: [
          {
            label: "Eggplant",
            id: "Eggplant",
            children: [],
          },
          {
            label: "Cabbage",
            id: "Cabbage",
            children: [],
          },
          {
            label: "Tomato",
            id: "Tomato",
            children: [],
          },
          {
            label: "Onion",
            id: "Onion",
            children: [],
          },
        ],
      },
      {
        label: "Fruit",
        id: "Fruit",
        children: [
          {
            label: "Mango",
            id: "Mango",
            children: [],
          },
          {
            label: "Peach",
            id: "Peach",
            children: [],
          },
          {
            label: "Apple",
            id: "Apple",
            children: [],
          },
          {
            label: "Guava",
            id: "Guava",
            children: [],
          },
          {
            label: "Watermelon",
            id: "Watermelon",
            children: [],
          },
          {
            label: "Pitaya",
            id: "Pitaya",
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

const nodeStyle = {
  fontStyle: "italic",
  fontWeight: "bold",
  color: "linear-gradient(to right, red , yellow)",
  fontVariantCaps: "small-caps",
  fontSize: "20px",
  paddingRight: "5px",
};
</script>
