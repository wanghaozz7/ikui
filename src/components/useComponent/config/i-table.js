export default {
  title: {
    text: "Table 表格",
    desc: "用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。",
  },
  lists: [
    {
      title: "Table Attributes",
      listData: [
        {
          params: "data",
          desc: "表格的数据",
          type: "Array",
          optional: "",
          default: "",
        },
        {
          params: "border",
          desc: "是否带有纵向边框",
          type: "Boolean",
          optional: "",
          default: "false",
        },
        {
          params: "cellStyle",
          desc: "单元格样式回调,可以根据参数传回不同的样式也可以使所有单元格共享相同样式",
          type: "Function/Object",
          optional: "",
          default: "",
        },
        {
          params: "height",
          desc: "默认高度为内容高度,设置固定高度后若内容溢出则出现滚动条并固定表头",
          type: "Number",
          optional: "",
          default: "",
        },
        {
          params: "showHeader",
          desc: "是否显示表头",
          type: "Boolean",
          optional: "",
          default: "true",
        },
        {
          params: "emptyText",
          desc: "表格没有传数据或数据长度为0时提示内容",
          type: "String",
          optional: "",
          default: "暂无内容",
        },
        {
          params: "cellEmptyText",
          desc: "表格某一行的某一列无数据时显示的内容",
          type: "String",
          optional: "",
          default: " ",
        },
        {
          params: "outsideBorder",
          desc: "是否显示包裹表格的最外层border",
          type: "Boolean",
          optional: "",
          default: "true",
        },
      ],
      type: "attributes",
    },
  ],
  children: [
    {
      id: "use-i-table-1",
      title: {
        text: "基础用法",
        desc: "基础的表格展示用法。",
      },
      code: `
          <template>
            <table-list :data="tableData" :out-side-border="false">
              <table-column prop="name" label="姓名" />
              <table-column prop="age" label="年龄" />
              <table-column prop="address" label="地址" />
            </table-list>
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

      `,
    },
    {
      id: "use-i-table-2",
      title: {
        text: "stripe 带斑马纹表格",
        desc: "使用带斑马纹的表格，可以更容易区分出不同行的数据。",
      },
      code: `
          <template>
            <table-list :data="tableData" :out-side-border="false" :stripe="true">
              <table-column prop="name" label="姓名" />
              <table-column prop="age" label="年龄" />
              <table-column prop="address" label="地址" />
            </table-list>
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

      `,
    },
    {
      id: "use-i-table-3",
      title: {
        text: "border 带边框表格",
        desc: "使单元格获得纵向的边框",
      },
      code: `
          <template>
            <table-list :data="tableData" :out-side-border="false" :border="true">
              <table-column prop="name" label="姓名" />
              <table-column prop="age" label="年龄" />
              <table-column prop="address" label="地址" />
            </table-list>
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

      `,
    },
    {
      id: "use-i-table-4",
      title: {
        text: "height 固定高度",
        desc: "当内容高度小于height时会留下空隙 当内容高度大于height时会固定表头",
      },
      code: `
          <template>
            <div style="padding: 15px">
              <table-list
                :data="tableData1"
                :out-side-border="true"
                :border="true"
                :height="250"
                style="margin-bottom: 25px"
              >
                <table-column prop="name" label="姓名" />
                <table-column prop="age" label="年龄" />
                <table-column prop="address" label="地址" />
              </table-list>
              <table-list
                :data="tableData2"
                :out-side-border="true"
                :border="true"
                :height="250"
              >
                <table-column prop="name" label="姓名" />
                <table-column prop="age" label="年龄" />
                <table-column prop="address" label="地址" />
              </table-list>
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

      `,
    },
    {
      id: "use-i-table-5",
      title: {
        text: "size 表格尺寸",
        desc: "size控制着单元格的font-size line-height padding 可选值:small medium big",
      },
      code: `
          <template>
            <div>
              <div class="row">
                <div class="col">
                  <table-list
                    :data="tableData"
                    :out-side-border="false"
                    size="small"
                    :border="true"
                  >
                    <table-column prop="name" label="姓名" />
                    <table-column prop="age" label="年龄" />
                    <table-column prop="address" label="地址" />
                  </table-list>
                </div>
                <div class="col">
                  <table-list
                    :data="tableData"
                    :out-side-border="false"
                    size="medium"
                    :border="true"
                  >
                    <table-column prop="name" label="姓名" />
                    <table-column prop="age" label="年龄" />
                    <table-column prop="address" label="地址" />
                  </table-list>
                </div>
              </div>
              <div>
                <table-list
                  :data="tableData"
                  :out-side-border="false"
                  size="big"
                  :border="true"
                >
                  <table-column prop="name" label="姓名" />
                  <table-column prop="age" label="年龄" />
                  <table-column prop="address" label="地址" />
                </table-list>
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

      `,
    },
    {
      id: "use-i-table-6",
      title: {
        text: "rowClassName 带状态的表格",
        desc: "所有行共享类(string) 为特定的行加上类(function)",
      },
      code: `
          <template>
            <div>
              <div style="font-size: 14px; color: gray; margin: 20px 20px 0 20px">
                根据行的内容或者索引对特定行添加类名
              </div>
              <table-list
                :data="tableData"
                :out-side-border="false"
                :row-class-name="getRowClassName"
                :border="true"
              >
                <table-column prop="name" label="姓名" :width="180" />
                <table-column prop="age" label="年龄" :width="180" />
                <table-column prop="address" label="地址" :min-width="180" />
              </table-list>
              <div style="font-size: 14px; color: gray; margin: 20px 20px 0 20px">
                依照这个规则可以自己实现斑马纹
              </div>
              <table-list
                :data="tableData"
                :out-side-border="false"
                :row-class-name="getStripeClass"
                :border="true"
              >
                <table-column prop="name" label="姓名" :width="180" />
                <table-column prop="age" label="年龄" :width="180" />
                <table-column prop="address" label="地址" :min-width="180" />
              </table-list>
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
    
      `,
    },
    {
      id: "use-i-table-7",
      title: {
        text: "cellStyle 单元格的样式回调",
        desc: "当传对象时相当于一个返回固定样式的函数(所有单元格共享样式) 如果传入的是函数则可以根据参数对每个单元格进行操作",
      },
      code: `
          <template>
            <table-list
              :data="tableData"
              :out-side-border="false"
              :border="true"
              :cell-style="getCellStyle"
              :showHeader="false"
            >
              <table-column prop="color1" label="color1" />
              <table-column prop="color2" label="color2" />
              <table-column prop="color3" label="color3" />
              <table-column prop="color4" label="color4" />
            </table-list>
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

      `,
    },
  ],
};
