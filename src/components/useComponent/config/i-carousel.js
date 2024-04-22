export default {
  title: {
    text: "Carousel 轮播图",
    desc: "在有限空间内,展示更多的内容",
  },
  lists: [
    {
      title: "Carousel Attributes",
      type: "attributes",
      listData: [
        {
          params: "circular",
          desc: "是否循环滚动",
          type: "Boolean",
          optional: "",
          default: "true",
        },
        {
          params: "autoRolling",
          desc: "是否自动滚动",
          type: "Boolean",
          optional: "",
          default: "true",
        },
        {
          params: "interval",
          desc: "自动滚动间隔",
          type: "Number",
          optional: "",
          default: "3000",
        },
        {
          params: "delay",
          desc: "滚动一次的延迟",
          type: "Number",
          optional: "",
          default: "250",
        },
        {
          params: "frame",
          desc: "动画的帧数",
          type: "Number",
          optional: "",
          default: "50",
        },
        {
          params: "trigger",
          desc: "触发方式",
          type: "String",
          optional: "hover/click",
          default: "hover",
        },
        {
          params: "showArrow",
          desc: "箭头显示方式",
          type: "String",
          optional: "hover/none/always",
          default: "hover",
        },
        {
          params: "indicatorType",
          desc: "指示器类型",
          type: "String",
          optional: "dot/rectangle",
          default: "dot",
        },
      ],
    },
    {
      title: "Carousel Events",
      type: "events",
      listData: [
        {
          method: "change",
          desc: "轮播图变化的事件回调(动画开始时)",
          params: "(变化前的索引,变化后的索引)",
        },
        {
          method: "changeAfterAnimation",
          desc: "轮播图变化的事件回调(动画结束时)",
          params: "(变化前的索引,变化后的索引)",
        },
      ],
    },
  ],
  children: [
    {
      id: "use-i-carousel-1",
      title: {
        text: "基础轮播图",
        desc: "基础的轮播图展示用法。",
      },
      code: `
          <template>
            <div class="carousel-container">
              <i-carousel
                @change="handleChange"
                @changeAfterAnimation="handleChangeAfterAnimation"
              >
                <carousel-item v-for="color in colorList" :key="color">
                  <div class="carousel-item" :style="{ background: color }" />
                </carousel-item>
              </i-carousel>
            </div>
          </template>

          <script setup>
          const colorList = [
            "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)",
            "linear-gradient(to right, #fc5c7d, #6a82fb)",
            "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
            "linear-gradient(to right, #007991, #78ffd6)",
            "linear-gradient(to right, #ee9ca7, #ffdde1)",
          ];

          const handleChange = (preIdx, curIdx) => {
            console.log(preIdx, curIdx);
          };

          const handleChangeAfterAnimation = (pre, cur) => {
            console.log(pre, cur);
          };
          </script>

          <style scoped lang="less">
          .carousel-container {
            height: 350px;
            margin: 50px;

            .carousel-item {
              width: 100%;
              height: 100%;
              font-size: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          </style>    
      `,
    },
    {
      id: "use-i-carousel-2",
      title: {
        text: "indicatorType 指示器",
        desc: "设置不同类型的指示器",
      },
      code: `
          <template>
            <div class="carousel-container">
              <i-carousel indicatorType="rectangle" showArrow="always">
                <carousel-item v-for="color in colorList" :key="color">
                  <div class="carousel-item" :style="{ background: color }" />
                </carousel-item>
              </i-carousel>
            </div>
          </template>
          
          <script setup>
          const colorList = [
            "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)",
            "linear-gradient(to right, #fc5c7d, #6a82fb)",
            "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
            "linear-gradient(to right, #007991, #78ffd6)",
            "linear-gradient(to right, #ee9ca7, #ffdde1)",
          ];
          </script>
          
          <style scoped lang="less">
          .carousel-container {
            height: 350px;
            margin: 50px;
            .carousel-item {
              width: 100%;
              height: 100%;
              font-size: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          </style>
      `,
    },
    {
      id: "use-i-carousel-3",
      title: {
        text: "trigger 触发方式",
        desc: "指示器的触发方式 默认下hover 可改为click",
      },
      code: `
          <template>
            <div class="carousel-container">
              <div class="block">
                <div class="text">使用click触发</div>
                <i-carousel trigger="click">
                  <carousel-item v-for="color in colorList" :key="color">
                    <div class="carousel-item" :style="{ background: color }" />
                  </carousel-item>
                </i-carousel>
              </div>
              <div class="block">
                <div class="text">使用hover触发</div>
                <i-carousel trigger="hover">
                  <carousel-item v-for="color in colorList" :key="url">
                    <div class="carousel-item" :style="{ background: color }" />
                  </carousel-item>
                </i-carousel>
              </div>
            </div>
          </template>

          <script setup>
          const colorList = [
            "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)",
            "linear-gradient(to right, #fc5c7d, #6a82fb)",
            "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
            "linear-gradient(to right, #007991, #78ffd6)",
            "linear-gradient(to right, #ee9ca7, #ffdde1)",
          ];
          </script>

          <style scoped lang="less">
          .carousel-container {
            height: 250px;
            margin: 50px;
            display: flex;
            .block {
              flex: 1;
              margin: 15px;
              .text {
                font-size: 14px;
                color: gray;
                text-align: center;
              }
              .carousel-item {
                width: 100%;
                height: 100%;
                font-size: 36px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
          </style>    
      `,
    },
    {
      id: "use-i-carousel-4",
      title: {
        text: "showArrow 箭头的显示时机",
        desc: "总是显示/总是不显示/鼠标进入轮播图时显示",
      },
      code: `
          <template>
            <div class="carousel-container">
              <i-carousel showArrow="hover">
                <carousel-item v-for="color in colorList" :key="color">
                  <div class="carousel-item" :style="{ background: color }" />
                </carousel-item>
              </i-carousel>
            </div>
          </template>
          
          <script setup>
          const colorList = [
            "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)",
            "linear-gradient(to right, #fc5c7d, #6a82fb)",
            "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
            "linear-gradient(to right, #007991, #78ffd6)",
            "linear-gradient(to right, #ee9ca7, #ffdde1)",
          ];
          </script>
          
          <style scoped lang="less">
          .carousel-container {
            height: 350px;
            margin: 50px;
          
            .carousel-item {
              width: 100%;
              height: 100%;
              font-size: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          </style>
      `,
    },
    {
      id: "use-i-carousel-5",
      title: {
        text: "autoRolling 自动滚动",
        desc: "自动滚动会在元素激活(浏览器非休眠、元素可见)时触发,可以通过interval设置间隔",
      },
      code: `
          <template>
            <div class="carousel-container">
              <i-carousel autoRolling :interval="2500" showArrow="hover">
                <carousel-item v-for="color in colorList" :key="color">
                  <div class="carousel-item" :style="{ background: color }" />
                </carousel-item>
              </i-carousel>
            </div>
          </template>
          
          <script setup>
          const colorList = [
            "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)",
            "linear-gradient(to right, #fc5c7d, #6a82fb)",
            "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
            "linear-gradient(to right, #007991, #78ffd6)",
            "linear-gradient(to right, #ee9ca7, #ffdde1)",
          ];
          </script>
          
          <style scoped lang="less">
          .carousel-container {
            height: 350px;
            margin: 50px;
          
            .carousel-item {
              width: 100%;
              height: 100%;
              font-size: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          </style>
      `,
    },
    {
      id: "use-i-carousel-6",
      title: {
        text: "circular 循环滚动",
        desc: "内容呈现环形衔接,自动滚动默认一直向右",
      },
      code: `
          <template>
            <div class="carousel-container">
              <i-carousel
                circular
                autoRolling
                showArrow="hover"
                @change="handleChange"
                @changeAfterAnimation="handleChangeAfterAnimation"
              >
                <carousel-item v-for="color in colorList" :key="color">
                  <div class="carousel-item" :style="{ background: color }" />
                </carousel-item>
              </i-carousel>
            </div>
          </template>
          
          <script setup>
          const colorList = [
            "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)",
            "linear-gradient(to right, #fc5c7d, #6a82fb)",
            "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
            "linear-gradient(to right, #007991, #78ffd6)",
            "linear-gradient(to right, #ee9ca7, #ffdde1)",
          ];
          
          const handleChange = (preIdx, curIdx) => {
            console.log(preIdx, curIdx);
          };
          
          const handleChangeAfterAnimation = (pre, cur) => {
            console.log(pre, cur);
          };
          </script>
          
          <style scoped lang="less">
          .carousel-container {
            height: 350px;
            margin: 50px;
          
            .carousel-item {
              width: 100%;
              height: 100%;
              font-size: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          </style>
      `,
    },
    {
      id: "use-i-carousel-7",
      title: {
        text: "indicatorPosition 指示器的位置",
        desc: "指示器可以选择放在内部或者外部",
      },
      code: `
          <template>
            <div class="carousel-container">
              <i-carousel trigger="click" indicatorPosition="outside">
                <carousel-item v-for="color in colorList" :key="color">
                  <div class="carousel-item" :style="{ background: color }" />
                </carousel-item>
              </i-carousel>
            </div>
          </template>
          
          <script setup>
          const colorList = [
            "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)",
            "linear-gradient(to right, #fc5c7d, #6a82fb)",
            "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
            "linear-gradient(to right, #007991, #78ffd6)",
            "linear-gradient(to right, #ee9ca7, #ffdde1)",
          ];
          </script>
          
          <style scoped lang="less">
          .carousel-container {
            height: 350px;
            margin: 50px;
          
            .carousel-item {
              width: 100%;
              height: 100%;
              font-size: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          </style>    
      `,
    },
    {
      id: "use-i-carousel-8",
      title: {
        text: "arrowPosition 箭头的位置",
        desc: "箭头可以选择放在内部或者外部",
      },
      code: `
          <template>
            <div class="carousel-container">
              <i-carousel arrowPosition="outside">
                <carousel-item v-for="color in colorList" :key="color">
                  <div class="carousel-item" :style="{ background: color }" />
                </carousel-item>
              </i-carousel>
            </div>
          </template>
          
          <script setup>
          const colorList = [
            "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)",
            "linear-gradient(to right, #fc5c7d, #6a82fb)",
            "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
            "linear-gradient(to right, #007991, #78ffd6)",
            "linear-gradient(to right, #ee9ca7, #ffdde1)",
          ];
          </script>
          
          <style scoped lang="less">
          .carousel-container {
            height: 350px;
            margin: 50px;
          
            .carousel-item {
              width: 100%;
              height: 100%;
              font-size: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          </style>
      `,
    },
  ],
};
