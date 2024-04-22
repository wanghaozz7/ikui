export default {
  title: {
    text: "Message 消息提示",
    desc: "常用于用户交互操作之后的反馈",
  },
  lists: [
    {
      title: "Carousel Attributes",
      listData: [
        {
          params: "type",
          desc: "信息体的类型",
          type: "String",
          optional: "info/warning/danger/success",
          default: "info",
        },
        {
          params: "info",
          desc: "提示消息的内容",
          type: "String",
          optional: "",
          default: " ",
        },
        {
          params: "delay",
          desc: "从出现到消失的时间间隔",
          type: "Number",
          optional: "",
          default: "3000",
        },
        {
          params: "showClose",
          desc: "是否显示关闭按钮",
          type: "Boolean",
          optional: "",
          default: "false",
        },
      ],
      type: "attributes",
    },
  ],
  children: [
    {
      id: "use-i-message-1",
      title: {
        text: "基础用法",
        desc: "默认消息提示会在3秒之后关闭 重复点击会从上到下进行排列",
      },
      code: `
          <template>
            <div class="wrapper">
              <div class="btn" @click="handleClick">打开消息提示</div>
            </div>
          </template>

          <script setup>
          import { getCurrentInstance } from "vue";

          const { proxy } = getCurrentInstance();

          const handleClick = (e) => {
            proxy.$message({
              info: "这是一段默认的消息提示",
            });
          };
          </script>

          <style scoped lang="less">
          .wrapper {
            height: 150px;
            display: flex;
            align-items: center;
            margin-left: 20px;

            .btn {
              line-height: 25px;
              padding: 15px;
              border: 1px solid #eee;
              border-radius: 2px;
              cursor: pointer;

              &:hover {
                border-color: lightblue;
                color: skyblue;
              }
            }
          }
          </style>
      `,
    },
    {
      id: "use-i-message-2",
      title: {
        text: "type 不同状态",
        desc: "提供了四种不同的状态 分别是info(默认) warning(警告) error(错误) success(成功)",
      },
      code: `
          <template>
            <div class="wrapper">
              <div class="btn" @click="handleClick(item)" v-for="item in arr" :key="item">
                {{ item }}
              </div>
            </div>
          </template>

          <script setup>
          import { getCurrentInstance } from "vue";

          const { proxy } = getCurrentInstance();

          const handleClick = (type) => {
            proxy.$message({
              info: "消息提示",
              type,
            });
          };

          const arr = ["success", "error", "warning", "info"];
          </script>

          <style scoped lang="less">
          .wrapper {
            height: 150px;
            display: flex;
            align-items: center;
            margin-left: 20px;

            .btn {
              line-height: 25px;
              padding: 15px;
              border: 1px solid #eee;
              border-radius: 2px;
              margin: auto;
              cursor: pointer;

              &:hover {
                border-color: lightblue;
                color: skyblue;
              }
            }
          }
          </style>
      `,
    },
    {
      id: "use-i-message-3",
      title: {
        text: "showClose 显示关闭按钮",
        desc: "可以通过设置dalay延长显示时间 这时候添加关闭按钮可以主动关闭message",
      },
      code: `
          <template>
            <div class="wrapper">
              <div class="btn" @click="handleClick">打开消息提示</div>
            </div>
          </template>

          <script setup>
          import { getCurrentInstance } from "vue";

          const { proxy } = getCurrentInstance();

          const handleClick = (e) => {
            proxy.$message({
              info: "这是一段的消息提示",
              type: "success",
              showClose: true,
              delay: 15000,
            });
          };
          </script>

          <style scoped lang="less">
          .wrapper {
            height: 150px;
            display: flex;
            align-items: center;
            margin-left: 20px;

            .btn {
              line-height: 25px;
              padding: 15px;
              border: 1px solid #eee;
              border-radius: 2px;
              cursor: pointer;

              &:hover {
                border-color: lightblue;
                color: skyblue;
              }
            }
          }
          </style>
      `,
    },
  ],
};
