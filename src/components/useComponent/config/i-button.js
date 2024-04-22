export default {
  title: {
    text: "Button 按钮",
    desc: "用于用户的点击交互操作",
  },
  lists: [
    {
      title: "Button Attributes",
      type: "attributes",
      listData: [
        {
          params: "type",
          desc: "按钮的类型",
          type: "String",
          optional: "normal/info/success/warning/danger",
          default: "normal",
        },
        {
          params: "size",
          desc: "按钮的尺寸",
          type: "String",
          optional: "large/medium/mini",
          default: "medium",
        },
        {
          params: "round",
          desc: "是否圆角按钮",
          type: "Boolean",
          optional: "",
          default: "false",
        },
      ],
    },
  ],
  children: [
    {
      id: "use-i-button-1",
      title: {
        text: "基础用法",
        desc: "基础按钮",
      },
      code: `
          <template>
          <div class="wrapper">
            <div class="row">
              <i-button @click="handleClick">默认按钮</i-button>
              <i-button @click="handleClick" type="info">信息按钮</i-button>
              <i-button @click="handleClick" type="success">成功按钮</i-button>
              <i-button @click="handleClick" type="warning">警告按钮</i-button>
              <i-button @click="handleClick" type="danger">危险按钮</i-button>
            </div>
            <div class="row">
              <i-button @click="handleClick" round>默认按钮</i-button>
              <i-button @click="handleClick" type="info" round>信息按钮</i-button>
              <i-button @click="handleClick" type="success" round>成功按钮</i-button>
              <i-button @click="handleClick" type="warning" round>警告按钮</i-button>
              <i-button @click="handleClick" type="danger" round>危险按钮</i-button>
            </div>
          </div>
          </template>

          <script setup>
          const handleClick = (e) => {
          console.log("e", e);
          };
          </script>

          <style scoped lang="less">
          .wrapper {
          padding: 20px;
          .row {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
            &:last-child {
              margin-bottom: 0;
            }
          }
          }
          </style>
      `,
    },
    {
      id: "use-i-button-2",
      title: {
        text: "size 按钮的尺寸",
        desc: "size —— large medium mini",
      },
      code: `
          <template>
            <div class="wrapper">
              <div class="row">
                <i-button @click="handleClick" size="large">默认按钮</i-button>
                <i-button @click="handleClick">默认按钮</i-button>
                <i-button @click="handleClick" size="mini">默认按钮</i-button>
              </div>
              <div class="row">
                <i-button @click="handleClick" round size="large">默认按钮</i-button>
                <i-button @click="handleClick" round>默认按钮</i-button>
                <i-button @click="handleClick" round size="mini">默认按钮</i-button>
              </div>
            </div>
          </template>

          <script setup>
          const handleClick = (e) => {
            console.log("e", e);
          };
          </script>

          <style scoped lang="less">
          .wrapper {
            padding: 20px;
            .row {
              display: flex;
              gap: 20px;
              margin-bottom: 20px;
              align-items: center;
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
          </style>
      `,
    },
  ],
};
