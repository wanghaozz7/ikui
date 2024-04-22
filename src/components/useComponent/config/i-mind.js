export default {
  title: {
    text: "Mind 思维导图",
    desc: "通过节点和连线绘制简易的思维导图 目前支持拖动、重命名、添加和删除功能",
  },
  lists: [
    {
      title: "Mind Attributes",
      type: "attributes",
      listData: [
        {
          params: "tree",
          desc: "树形数据",
          type: "Object",
          optional: "",
          default: "",
        },
        {
          params: "maxWidth",
          desc: "画布的最大宽度",
          type: "Number",
          optional: "",
          default: "800",
        },
        {
          params: "ligatureType",
          desc: "节点之间的连线类型",
          type: "String",
          optional: "straight/curve/fold",
          default: "fold",
        },
        {
          params: "verticalGap",
          desc: "节点之间的竖直间距",
          type: "Number",
          optional: "",
          default: "30",
        },
        {
          params: "horizonGap",
          desc: "节点之间的水平间距",
          type: "Number",
          optional: "",
          default: "150",
        },
        {
          params: "horizonPadding",
          desc: "水平内边距",
          type: "Number",
          optional: "",
          default: "15",
        },
        {
          params: "defaultStrokeStyle",
          desc: "默认边框颜色",
          type: "String",
          optional: "",
          default: "#FFE384",
        },
        {
          params: "hoverStrokeStyle",
          desc: "悬浮时边框颜色",
          type: "String",
          optional: "",
          default: "#FF0000",
        },
        {
          params: "lineWidth",
          desc: "边框粗细",
          type: "Number",
          optional: "",
          default: "2",
        },
        {
          params: "fillStyle",
          desc: "字体颜色",
          type: "String",
          optional: "",
          default: "black",
        },
        {
          params: "fontStyle",
          desc: "字体样式",
          type: "String",
          optional: "",
          default: "normal 24px 微软雅黑",
        },
        {
          params: "ligatureLineWidth",
          desc: "连线粗细",
          type: "Number",
          optional: "",
          default: "1",
        },
        {
          params: "ligatureStrokeStyle",
          desc: "连线颜色",
          type: "String",
          optional: "",
          default: "lightblue",
        },
        {
          params: "buttonRadius",
          desc: "按钮的半径",
          type: "Number",
          optional: "",
          default: "12",
        },
        {
          params: "buttonBackgroundColor",
          desc: "按钮的填充色",
          type: "String",
          optional: "",
          default: "purple",
        },
        {
          params: "nodeInDragStrokeStyle",
          desc: "节点被拖动时的边框色",
          type: "String",
          optional: "",
          default: "gray",
        },
        {
          params: "nodeInDragFillStyle",
          desc: "节点被拖动时的填充色",
          type: "String",
          optional: "",
          default: "gray",
        },
        {
          params: "foldLineLength",
          desc: "折线延长线的长度",
          type: "Number",
          optional: "",
          default: "50",
        },
      ],
    },
    {
      title: "Mind Events",
      type: "events",
      listData: [
        {
          method: "treeChange",
          desc: "数据发生变化(重命名、移动子树、添加删除节点)",
          params: "变化后的新树的根节点",
        },
        {
          method: "nodeClick",
          desc: "节点被单击后",
          params: "被单击的节点",
        },
        {
          method: "nodeEdit",
          desc: "节点进入编辑状态",
          params: "被编辑的节点",
        },
        {
          method: "addNode",
          desc: "在一个节点的子节点末位添加一个新节点",
          params: "被添加的节点",
        },
        {
          method: "deleteNode",
          desc: "删除一个节点和他的子树",
          params: "被删除的节点",
        },
        {
          method: "dragNodeStart",
          desc: "拖拽开始时",
          params: "被拖拽的节点",
        },
        {
          method: "dragNodeEnd",
          desc: "拖拽结束时",
          params: "被拖拽的节点",
        },
      ],
    },
  ],
  children: [
    {
      id: "use-i-mind-1",
      title: {
        text: "基础用法",
        desc: "鼠标悬浮在内容时立即出现文字提示",
      },
      code: `
          <template>
            <mind
              :tree="tree"
              @treeChange="handleTreeChange"
              :maxWidth="1014"
              @nodeClick="handleNodeClick"
              @nodeEdit="handleNodeEdit"
              @addNode="handleAddNode"
              @deleteNode="handleDeleteNode"
              @dragNodeStart="handleDragStart"
              @dragNodeEnd="handleDragEnd"
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
                    label: "茄子 🍆",
                    id: "茄子",
                  },
                  {
                    label: "南瓜",
                    id: "南瓜",
                  },
                ],
              },
            ],
          };
          const handleTreeChange = (newTree) => {
            tree = newTree;
            console.log("treeChange", tree);
          };
          const handleNodeClick = (node) => {
            console.log("click", node);
          };
          const handleNodeEdit = (node) => {
            console.log("edit", node);
          };
          const handleAddNode = (node) => {
            console.log("add", node);
          };
          const handleDeleteNode = (node) => {
            console.log("delete", node);
          };
          const handleDragStart = (node) => {
            console.log("drag-start", node);
          };
          const handleDragEnd = (node) => {
            console.log("drag-end", node);
          };
          </script>
      `,
    },
    {
      id: "use-i-mind-2",
      title: {
        text: "ligatureType 节点之间连线的类型",
        desc: "包括直线、折线、曲线三种类型",
      },
      code: `
          <template>
            <mind
              :tree="tree"
              @treeChange="handleTreeChange"
              :maxWidth="1014"
              ligatureType="curve"
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
      `,
      // defaultChecked: true,
    },
    {
      id: "use-i-mind-3",
      title: {
        text: "nodeAttributes 样式属性",
        desc: "包括节点边框颜色、高亮颜色、连线颜色、字体样式、边距等",
      },
      code: `
          <template>
            <mind
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
      `,
    },
  ],
};
