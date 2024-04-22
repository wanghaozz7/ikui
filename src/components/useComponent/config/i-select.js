export default {
  title: {
    text: "Select 选择器",
    desc: "通过节点和连线绘制简易的思维导图 目前支持拖动、重命名、添加和删除功能",
  },
  lists: [
    {
      title: "Select Attributes",
      type: "attributes",
      listData: [
        {
          params: "v-model",
          desc: "绑定值",
          type: "String/Boolean/Number",
          optional: "",
          default: "",
        },
        {
          params: "option",
          desc: "下拉框的配置项",
          type: "Array",
          optional: "",
          default: "",
        },
        {
          params: "disabled",
          desc: "是否禁用",
          type: "Boolean",
          optional: "",
          default: "false",
        },
        {
          params: "clearable",
          desc: "是否可以清除状态",
          type: "Boolean",
          optional: "",
          default: "false",
        },
        {
          params: "width",
          desc: "选择器的宽度",
          type: "Number",
          optional: "",
          default: "240",
        },
        {
          params: "height",
          desc: "选择器的高度",
          type: "Number",
          optional: "",
          default: "35",
        },
        {
          params: "size",
          desc: "选择器的尺寸",
          type: "String",
          optional: "large/medium/mini",
          default: "medium",
        },
        {
          params: "placeholder",
          desc: "同原生input的placeholder",
          type: "String",
          optional: "",
          default: "请选择",
        },
      ],
    },
    {
      title: "Select Events",
      type: "events",
      listData: [
        {
          method: "select",
          desc: "点击下拉框选项后的回调",
          params: "点击的配置项",
        },
        {
          method: "change",
          desc: "与select的区别是只有在选项发生变化时会触发",
          params: "点击的配置项",
        },
        {
          method: "visibleChange",
          desc: "下拉菜单显示或隐藏时的回调",
          params: "下拉菜单的显隐状态",
        },
        {
          method: "clear",
          desc: "状态被清理时的回调",
          params: "",
        },
        {
          method: "focus",
          desc: "输入框聚焦时的回调",
          params: "",
        },
        {
          method: "blur",
          desc: "输入框失去焦点时的回调",
          params: "",
        },
      ],
    },
  ],
  children: [
    {
      id: "use-i-select-1",
      title: {
        text: "基础用法",
        desc: "鼠标悬浮在内容时立即出现文字提示",
      },
      code: `
          <template>
            <div style="padding: 20px">
              <i-select
                :option="option"
                v-model="value"
                @select="handleSelect"
                @change="handleChange"
                @visibleChange="handleVisibleChange"
                @focus="handleFocus"
                @blur="handleBlur"
              />
            </div>
          </template>
          
          <script setup>
          let value = undefined;
          
          const option = [
            {
              label: "桃子",
              value: "value-桃子",
            },
            {
              label: "香蕉",
              value: "value-香蕉",
            },
            {
              label: "苹果",
              value: "value-苹果",
            },
            {
              label: "橙子",
              value: "value-橙子",
            },
            {
              label: "葡萄",
              value: "value-葡萄",
            },
          ];
          
          const handleSelect = (val) => {
            console.log("handleSelect", val, value);
          };
          
          const handleChange = (val) => {
            console.log("handleChange", val, value);
          };
          
          const handleVisibleChange = (visible) => {
            console.log("visibleChange", visible);
          };
          
          const handleFocus = () => {
            console.log("handleFocus");
          };
          
          const handleBlur = () => {
            console.log("handleBlur");
          };
          </script>
      `,
    },
    {
      id: "use-i-select-2",
      title: {
        text: "size 定制尺寸",
        desc: "可以用size指定通用的尺寸 也可以使用width和height定制大小 同时指定时后者权重较大",
      },
      code: `
          <template>
            <div class="wrapper">
              <div class="row">
                <div class="text" style="font-size: 18px">较大尺寸(size=large) :</div>
                <i-select
                  v-model="value"
                  :option="option"
                  size="large"
                  placeholder="size = large <=> width = 360, height = 50"
                />
              </div>
              <div class="row">
                <div class="text">中等尺寸(size=medium) :</div>
                <i-select
                  v-model="value"
                  :option="option"
                  size="medium"
                  placeholder="width = 240, height = 35"
                />
              </div>
              <div class="row">
                <div class="text" style="font-weight: bolder">
                  自定义尺寸(width:180,height:30) :
                </div>
                <i-select
                  v-model="value"
                  :option="option"
                  :width="180"
                  :height="30"
                  placeholder="自定义大小"
                />
              </div>
              <div class="row">
                <div class="text" style="font-size: 14px">较小尺寸(size=mini) :</div>
                <i-select
                  v-model="value"
                  :option="option"
                  size="mini"
                  placeholder="120,25"
                />
              </div>
            </div>
          </template>
          
          <script setup>
          let value = undefined;
          
          const option = [
            {
              label: "桃子",
              value: "value-桃子",
            },
            {
              label: "香蕉",
              value: "value-香蕉",
            },
            {
              label: "苹果",
              value: "value-苹果",
            },
            {
              label: "橙子",
              value: "value-橙子",
            },
            {
              label: "葡萄",
              value: "value-葡萄",
            },
          ];
          </script>
          
          <style scoped lang="less">
          .wrapper {
            padding: 20px;
            .row {
              height: 70px;
              display: flex;
              align-items: center;
              .text {
                margin-right: 20px;
                width: 300px;
                color: gray;
              }
            }
          }
          </style>    
      `,
    },
    {
      id: "use-i-select-3",
      title: {
        text: "disabled 禁用状态和禁用选项",
        desc: "通过disabled字段使select不可用或者使选项不可用",
      },
      code: `
          <template>
            <div
              style="
                display: flex;
                flex-direction: column;
                height: 100px;
                gap: 20px;
                padding: 20px;
              "
            >
              <i-select
                v-model="value"
                :option="option"
                disabled
                placeholder="禁用状态"
              />
              <i-select v-model="value" :option="option" placeholder="有禁用选项" />
            </div>
          </template>
          
          <script setup>
          let value = undefined;
          
          const option = [
            {
              label: "桃子",
              value: "桃子",
            },
            {
              label: "香蕉",
              value: "香蕉",
              disabled: true,
            },
            {
              label: "苹果",
              value: "苹果",
            },
            {
              label: "橙子",
              value: "橙子",
            },
            {
              label: "葡萄",
              value: "葡萄",
              disabled: true,
            },
          ];
          </script>
      `,
    },
    {
      id: "use-i-select-4",
      title: {
        text: "clearable 清除当前的选中值",
        desc: "通过disabled字段使select不可用或者使选项不可用",
      },
      code: `
          <template>
            <div style="padding: 20px">
              <i-select v-model="value" :option="option" clearable @clear="handleClear" />
            </div>
          </template>
          
          <script setup>
          let value = "value-桃子";
          
          const option = [
            {
              label: "桃子",
              value: "value-桃子",
            },
            {
              label: "香蕉",
              value: "value-香蕉",
            },
            {
              label: "苹果",
              value: "value-苹果",
            },
            {
              label: "橙子",
              value: "value-橙子",
            },
            {
              label: "葡萄",
              value: "value-葡萄",
            },
          ];
          
          const handleClear = () => {
            console.log("handleClear");
          };
          </script>
      `,
    },
  ],
};
