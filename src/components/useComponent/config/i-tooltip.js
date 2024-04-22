export default {
  title: {
    text: "Tooltip 文字提示",
    desc: "常用于展示鼠标 hover 时的提示信息。",
  },
  lists: [
    {
      title: "Tooltip Attributes",
      listData: [
        {
          params: "placement",
          desc: "悬浮的位置",
          type: "String",
          optional: "top/bottom/left/right",
          default: "top",
        },
        {
          params: "content",
          desc: "悬浮的文字提示",
          type: "Function/Object",
          optional: "",
          default: "我是tooltip",
        },
        {
          params: "offset",
          desc: "三角形箭头的偏移量",
          type: "Number",
          optional: "",
          default: "20",
        },
        {
          params: "theme",
          desc: "样式风格",
          type: "string",
          optional: "light/dark",
          default: "light",
        },
        {
          params: "delay",
          desc: "消失的延迟",
          type: "number",
          optional: "",
          default: "500",
        },
      ],
      type: "attributes",
    },
  ],
  children: [
    {
      id: "use-i-tooltip-1",
      title: {
        text: "基础用法",
        desc: "鼠标悬浮在内容时立即出现文字提示",
      },
      code: `
          <template>
            <tooltip content="我是文字提示~" :refreshTooltip="refreshTooltip">
              <div class="item">我是文字内容</div>
            </tooltip>
          </template>

          <script setup>
          const props = defineProps({
            refreshTooltip: {
              type: Boolean,
              default: false,
            },
          });
          </script>

          <style scoped>
          .item {
            width: 150px;
            height: 100px;
            margin: 70px auto;
            border: 1px solid #ebebeb;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          </style>

      `,
    },
    {
      id: "use-i-tooltip-2",
      title: {
        text: "placement 不同的出现位置",
        desc: "通过placement字段选择tooltip出现的位置",
      },
      code: `
          <template>
            <div style="margin-top: 50px" class="cont">
              <tooltip
                placement="top"
                content="我悬浮在上边~"
                :refreshTooltip="refreshTooltip"
              >
                <div class="item">上</div>
              </tooltip>
            </div>
            <div style="margin: 50px 0; gap: 150px" class="cont">
              <tooltip
                placement="left"
                content="我悬浮在左边~"
                :refreshTooltip="refreshTooltip"
              >
                <div class="item">左</div>
              </tooltip>
              <tooltip
                placement="right"
                content="我悬浮在右边~"
                :refreshTooltip="refreshTooltip"
              >
                <div class="item">右</div>
              </tooltip>
            </div>
            <div style="margin-bottom: 50px" class="cont">
              <tooltip
                placement="bottom"
                content="我悬浮在下边~"
                :refreshTooltip="refreshTooltip"
              >
                <div class="item">下</div>
              </tooltip>
            </div>
          </template>

          <script setup>
          const props = defineProps({
            refreshTooltip: {
              type: Boolean,
              default: false,
            },
          });
          </script>

          <style scoped lang="less">
          .tooltip-container {
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            .tooltip-content {
              border: 1px solid gray;
              border-radius: 4px;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 8px;
            }
          }

          .item {
            width: 75px;
            height: 75px;
            border: 1px solid gray;
            margin: 100px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          .cont {
            height: 75px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          </style>

      `,
    },
    {
      id: "use-i-tooltip-3",
      title: {
        text: "theme 颜色主题",
        desc: "根据页面的风格选择不同的主题",
      },
      code: `
          <template>
            <div class="wrapper">
              <div class="block">
                <div class="text">light</div>
                <tooltip
                  content="我是文字提示~"
                  :refreshTooltip="refreshTooltip"
                  theme="light"
                  :offset="40"
                >
                  <div class="item">我是文字内容</div>
                </tooltip>
              </div>
              <div class="block">
                <div class="text">dark</div>
                <tooltip
                  content="我是文字提示~"
                  :refreshTooltip="refreshTooltip"
                  theme="dark"
                  :offset="40"
                >
                  <div class="item">我是文字内容</div>
                </tooltip>
              </div>
            </div>
          </template>

          <script setup>
          const props = defineProps({
            refreshTooltip: {
              type: Boolean,
              default: false,
            },
          });
          </script>

          <style lang="less" scoped>
          .wrapper {
            display: flex;

            .block {
              flex: 1;
              margin: 50px 120px;

              .text {
                width: 100%;
                font-size: 14px;
                color: gray;
                text-align: center;
                margin-bottom: 15px;
              }

              .item {
                width: 100%;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border: 1px solid #ebebeb;
                border-radius: 2px;
              }
            }
          }
          </style>

      `,
    },
    {
      id: "use-i-tooltip-4",
      title: {
        text: "delay 触发延迟",
        desc: "在鼠标移动频率较高的区域,频繁触发tooltip可能会造成困扰,通过设置触发延迟让他的出现次数减少",
      },
      code: `
          <template>
            <tooltip
              content="我是文字提示~"
              :refreshTooltip="refreshTooltip"
              :openDelay="450"
            >
              <div class="item">我是文字内容</div>
            </tooltip>
          </template>

          <script setup>
          const props = defineProps({
            refreshTooltip: {
              type: Boolean,
              default: false,
            },
          });
          </script>

          <style scoped>
          .item {
            width: 150px;
            height: 100px;
            margin: 70px auto;
            border: 1px solid #ebebeb;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          </style>

      `,
    },
    {
      id: "use-i-tooltip-5",
      title: {
        text: "offset 箭头到内容的距离",
        desc: "三角形尖端到绑定元素的垂直距离,默认值为20(px)",
      },
      code: `
          <template>
            <div class="wrapper">
              <div class="block" v-for="val in arr" :key="val">
                <tooltip
                  content="我是文字提示~"
                  :refreshTooltip="refreshTooltip"
                  :offset="val"
                >
                  <div class="item">{{ val }}</div>
                </tooltip>
              </div>
            </div>
          </template>

          <script setup>
          const props = defineProps({
            refreshTooltip: {
              type: Boolean,
              default: false,
            },
          });
          const arr = [20, 30, 40, 50, 60, 70, 80];
          </script>

          <style lang="less" scoped>
          .wrapper {
            display: flex;

            .block {
              flex: 1;
              margin: 120px 20px 50px 20px;

              .item {
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border: 1px solid #ebebeb;
                border-radius: 2px;
              }
            }
          }
          </style>

      `,
    },
  ],
};
