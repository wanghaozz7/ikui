export default {
  title: {
    text: "Switch 开关",
    desc: "表示两种相互对立的状态间的切换，多用于触发「开/关」。",
  },
  lists: [
    {
      title: "Switch Attributes",
      listData: [
        {
          params: "v-model",
          desc: "绑定值",
          type: "Boolean",
          optional: "",
          default: "",
        },
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
          type: "String",
          optional: "light/dark",
          default: "light",
        },
        {
          params: "delay",
          desc: "消失的延迟",
          type: "Number",
          optional: "",
          default: "500",
        },
      ],
      type: "attributes",
    },
    {
      title: "Switch Events",
      type: "events",
      listData: [
        {
          method: "change",
          desc: "开关状态变化时的回调",
          params: "当前状态",
        },
        {
          method: "active",
          desc: "开关激活时的回调",
          params: "true",
        },
        {
          method: "inactive",
          desc: "开关未激活时的回调",
          params: "false",
        },
      ],
    },
  ],
  children: [
    {
      id: "use-i-switch-1",
      title: {
        text: "基础用法",
        desc: "朴素的红绿色代表开关的不同状态",
      },
      code: `
          <template>
            <div style="padding: 20px">
              <Switch
                v-model="val"
                @change="handleChange"
                @active="handleActive"
                @inactive="handleInactive"
              />
            </div>
          </template>

          <script setup>
          let val;

          const handleChange = (value) => {
            console.log("val", val, value);
          };

          const handleActive = (e) => {
            console.log("active", val, e);
          };

          const handleInactive = (e) => {
            console.log("inactive", val, e);
          };
          </script>

      `,
    },
    {
      id: "use-i-switch-2",
      title: {
        text: "size 开关的尺寸",
        desc: "通过width和height控制开关的尺寸",
      },
      code: `
          <template>
            <div class="wrapper">
              <div class="row">
                <Switch @change="handleChange" class="item" />
                <Switch @change="handleChange" :width="120" :height="40" class="item" />
                <Switch @change="handleChange" :width="150" :height="50" class="item" />
              </div>
            </div>
          </template>

          <script setup>
          const handleChange = (value) => {
            console.log(value);
          };
          </script>

          <style scoped lang="less">
          .wrapper {
            padding: 20px;

            .row {
              display: flex;
              width: 100%;
              align-items: center;

              .item {
                flex: 1;
              }
            }
          }
          </style>

      `,
    },
    {
      id: "use-i-switch-3",
      title: {
        text: "type 一些有趣的样式类型",
        desc: "不拘一格的显示方式 参数类型与普通开关不共享",
      },
      code: `
          <template>
            <div class="wrapper">
              <div class="row">
                <Switch @change="handleChange" class="item" type="face" v-model="face" />
                <Switch @change="handleChange" class="item" type="dog" v-model="dog" />
                <Switch
                  @change="handleChange"
                  class="item"
                  type="displace"
                  v-model="displace"
                />
                <Switch
                  @change="handleChange"
                  class="item"
                  type="basketball"
                  v-model="basketball"
                />
              </div>
              <div class="row">
                <Switch
                  @change="handleChange"
                  class="item"
                  type="overturn"
                  v-model="overturn"
                />
                <Switch
                  @change="handleChange"
                  class="item"
                  type="parallelogram"
                  v-model="parallelogram"
                />
                <Switch
                  @change="handleChange"
                  class="item"
                  type="ripple"
                  v-model="ripple"
                />
                <Switch @change="handleChange" class="item" type="roll" v-model="roll" />
              </div>
              <div class="row">
                <Switch
                  @change="handleChange"
                  class="item"
                  type="seesaw"
                  v-model="seesaw"
                />
                <Switch
                  @change="handleChange"
                  class="item"
                  type="pancake"
                  v-model="pancake"
                />
                <Switch
                  @change="handleChange"
                  class="item"
                  type="transparent"
                  v-model="transparent"
                />
                <Switch
                  @change="handleChange"
                  class="item"
                  type="weather"
                  v-model="weather"
                />
              </div>
            </div>
          </template>

          <script setup>
          let face,
            displace,
            dog,
            basketball,
            overturn,
            parallelogram,
            ripple,
            roll,
            seesaw,
            pancake,
            transparent,
            weather;

          const handleChange = (value) => {
            console.log(value);
            console.log(
              face,
              displace,
              dog,
              basketball,
              overturn,
              parallelogram,
              ripple,
              roll,
              seesaw,
              pancake,
              transparent,
              weather
            );
          };
          </script>

          <style scoped lang="less">
          .wrapper {
            padding: 20px;

            .row {
              display: flex;
              width: 100%;
              box-sizing: border-box;
              align-items: center;
              border-bottom: 2px solid #fff;
              background-color: rgb(187, 253, 187);
              padding: 50px;

              .item {
                flex: 1;
              }
            }
          }
          </style>

      `,
    },
    {
      id: "use-i-switch-4",
      title: {
        text: "text 开关状态对应的文字描述",
        desc: "点击对应的文字描述可以单向切换至该状态",
      },
      code: `
          <template>
            <div class="row">
              <Switch
                v-model="val"
                @change="handleChange"
                activeText="开灯"
                inactiveText="关灯"
                class="item"
              />
              <Switch
                v-model="val"
                @change="handleChange"
                activeText="开灯"
                inactiveText="关灯"
                class="item"
                :width="120"
                :height="40"
              />
              <Switch
                v-model="val"
                @change="handleChange"
                activeText="开灯"
                inactiveText="关灯"
                class="item"
                :width="150"
                :height="50"
              />
            </div>
          </template>

          <script setup>
          let val;

          const handleChange = (value) => {
            console.log("val", val, value);
          };
          </script>

          <style scoped lang="less">
          .row {
            padding: 20px;
            display: flex;

            .item {
              flex: 1;
            }
          }
          </style>

      `,
    },
    {
      id: "use-i-switch-5",
      title: {
        text: "color 开关状态对应的颜色",
        desc: "开关状态对应的颜色",
      },
      code: `
          <template>
            <div class="row">
              <Switch
                v-model="val"
                @change="handleChange"
                activeText="绿色"
                inactiveText="红色"
                class="item"
              />
              <Switch
                v-model="val"
                @change="handleChange"
                activeText="黄色"
                inactiveText="粉色"
                class="item"
                activeColor="yellow"
                inactiveColor="pink"
              />
            </div>
          </template>

          <script setup>
          let val;

          const handleChange = (value) => {
            console.log("val", val, value);
          };
          </script>

          <style scoped lang="less">
          .row {
            padding: 20px;
            display: flex;

            .item {
              flex: 1;
            }
          }
          </style>

      `,
    },
  ],
};
