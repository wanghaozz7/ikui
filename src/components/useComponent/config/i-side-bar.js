export default {
  title: {
    text: "Sidebar 侧边栏(树形结构)",
    desc: "可以用作普通的侧边导航栏 也可以作为树形选择器",
  },
  lists: [
    {
      title: "Sidebar Attributes",
      listData: [
        {
          params: "sideBarData",
          desc: "数据",
          type: "Array",
          optional: "",
          default: "",
        },
        {
          params: "rowHeight",
          desc: "每一行的高度",
          type: "Number",
          optional: "",
          default: "32",
        },
        {
          params: "nodeStyle",
          desc: "节点的样式",
          type: "Object",
          optional: "",
          default: "",
        },
        {
          params: "defaultCheckedAll",
          desc: "默认全选(仅在出现勾选框时有效)",
          type: "Boolean",
          optional: "",
          default: "false",
        },
        {
          params: "defaultUnfoldAll",
          desc: "默认展开全部节点",
          type: "Boolean",
          optional: "",
          default: "true",
        },
        {
          params: "showCheckBox",
          desc: "是否显示勾选框",
          type: "Boolean",
          optional: "",
          default: "false",
        },
      ],
      type: "attributes",
    },
    {
      title: "Sidebar Events",
      type: "events",
      listData: [
        {
          method: "checkedNodeArrayChange",
          desc: "节点选中状态变化时的回调(在showCheckBox为true的情况下触发)",
          params:
            "包含所有被勾选的叶子节点的一维数组(按照追加顺序 最后一次点击的在队首)",
        },
        {
          method: "nodeCheckedChange",
          desc: "叶子节点被点击时的回调",
          params: "被点击的叶子节点",
        },
      ],
    },
  ],
  children: [
    {
      id: "use-i-side-bar-1",
      title: {
        text: "基础用法",
        desc: "侧边导航栏的基础用法 默认会展开所有节点",
      },
      code: `
          <template>
            <div style="width: 240px; margin: 10px auto">
              <side-bar
                :sideBarData="treeData"
                @nodeCheckedChange="handleNodeCheckedChange"
              />
            </div>
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
            console.log("nodeCheckedChange", node);
          };
          </script>
      `,
    },
    {
      id: "use-i-side-bar-2",
      title: {
        text: "showCheckBox 显示勾选框",
        desc: "该字段为true情况下 侧边栏变成了一个树形结构多选框 可以以追加的方式监听所有被选择的叶子节点",
      },
      code: `
          <template>
            <side-bar
              :sideBarData="treeData"
              :showCheckBox="true"
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
            console.log("nodeCheckedChange", node);
          };

          const handleCheckedNodeArrayChange = (arr) => {
            console.log("handleCheckedNodeArrayChange", arr);
          };
          </script>
      `,
    },
    {
      id: "use-i-side-bar-3",
      title: {
        text: "defaultUnfold(Checked) 默认状态",
        desc: "为所有节点选择统一的状态(非叶子节点是否展开 勾选框状态下是否全选)",
      },
      code: `
          <template>
            <side-bar
              :sideBarData="treeData"
              :showCheckBox="true"
              :defaultUnfoldAll="false"
              :defaultCheckedAll="true"
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
            console.log("nodeCheckedChange", node);
          };

          const handleCheckedNodeArrayChange = (arr) => {
            console.log("handleCheckedNodeArrayChange", arr);
          };
          </script>
      `,
    },
    {
      id: "use-i-side-bar-4",
      title: {
        text: "nodeStyle 节点样式",
        desc: "更改节点的默认样式",
      },
      code: `
          <template>
            <side-bar
              :sideBarData="treeData"
              :showCheckBox="true"
              :nodeStyle="nodeStyle"
              :rowHeight="40"
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
            console.log("nodeCheckedChange", node);
          };

          const handleCheckedNodeArrayChange = (arr) => {
            console.log("handleCheckedNodeArrayChange", arr);
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
      `,
    },
    {
      id: "use-i-side-bar-5",
      title: {
        text: "nodeAttrs 节点状态",
        desc: "为了单个节点设置状态(是否默认展开、选中)",
      },
      code: `
          <template>
            <side-bar
              :sideBarData="treeData"
              :showCheckBox="true"
              :defaultUnfoldAll="false"
              @nodeCheckedChange="handleNodeCheckedChange"
              @checkedNodeArrayChange="handleCheckedNodeArrayChange"
            />
          </template>

          <script setup>
          const treeData = [
            {
              label: "动物动物动物动物动物动物动物动物",
              id: "动物",
              defaultUnfold: true,
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
                  defaultUnfold: true,
                  children: [
                    {
                      label: "猛禽",
                      id: "猛禽",
                      defaultUnfold: true,
                      children: [
                        {
                          label: "游隼",
                          id: "游隼",
                          defaultChecked: true,
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
                          defaultChecked: true,
                        },
                        {
                          label: "角雕",
                          id: "角雕",
                        },
                        {
                          label: "食猿雕",
                          id: "食猿雕",
                          defaultChecked: true,
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
            console.log("nodeCheckedChange", node);
          };

          const handleCheckedNodeArrayChange = (arr) => {
            console.log("handleCheckedNodeArrayChange", arr);
          };
          </script>
      `,
    },
  ],
};
