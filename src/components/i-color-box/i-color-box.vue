<template>
  <div class="container" :style="getVariable">
    <div class="color-box" ref="colorBox" @click="handleClick">
      <div style="width: var(--label-size)" v-if="label">{{ label }}</div>
    </div>
    <div class="opacity-box-container" v-if="showOpacity">
      <div class="opacity-box" v-for="(opacity, idx) in opacitys" :key="idx">
        <i-color-box :size="35" :color="color.colorRgb(opacity)" :show-opacity="false" @click="activeOpacity = opacity" />
        <transition name="ease-in-out" appear>
          <div v-show="opacity === activeOpacity">
            <div class="opcaty-kunai">
              <i-kunai :color="color.colorRgb(opacity)" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup name="i-color-box">
import { watch, getCurrentInstance, computed, ref } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "#fff",
  },
  label: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 175,
  },
  showOpacity: {
    type: Boolean,
    default: false,
  },
});

const { proxy } = getCurrentInstance();

let lastColorName = props.label;

const opacitys = [0.2, 0.4, 1, 0.8, 0.6];

let activeOpacity = ref(1);

const getVariable = computed(() => {
  return {
    "--background": getColor(),
    "--box-size": props.size + "px",
    "--slide-size": props.size * 2 + "px",
    "--label-size": props.size - 40 + "px",
    "--box-shadow": props.showOpacity
      ? `0 0 8px 0 ${getColor()}, 0 2px 4px 0 ${getColor()}`
      : "0 0 0 0 transparent, 0 0 0 0 transparent",
    "--margin-right": props.showOpacity ? "100px" : "0",
  };
});

const getColor = () => {
  return props.showOpacity
    ? props.color.colorRgb(activeOpacity.value)
    : props.color;
};
const handleClick = (e) => {
  if (props.showOpacity) {
    // 复制颜色
    const input = document.createElement("input");
    input.value = getColor();
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    proxy.$message({
      type: "custom",
      info: `${getColor()} —— copied!`,
      delay: 1000,
      color: getColor(),
    });
    document.body.removeChild(input);
  }
};

watch(
  () => props.color,
  (newVal, oldVal) => {
    const colorBox = proxy.$refs.colorBox;
    const slideBox = document.createElement("div");
    slideBox.className = "slide-box";
    slideBox.style.background = oldVal;
    const innerBox = document.createElement("div");

    innerBox.innerText = lastColorName;
    innerBox.className = "inner-box";
    slideBox.appendChild(innerBox);
    colorBox.appendChild(slideBox);
    setTimeout(() => {
      slideBox.style.transform = `translate(${props.size}px,${props.size}px)`;
      setTimeout(() => {
        colorBox.removeChild(slideBox);
      }, 510);
    }, 10);
    lastColorName = props.label;
    activeOpacity.value = 1;
  },
  {
    immediate: false,
  }
);

String.prototype.colorRgb = function (opacity = 1) {
  // 16进制颜色值的正则
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 把颜色值变成小写
  var color = this.toLowerCase();
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = [];
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return "rgba(" + colorChange.join(",") + `,${opacity}` + ")";
  } else {
    return color;
  }
};
</script>

<script>
export default { name: "i-color-box" };
</script>

<style scoped lang="less">
.container {
  display: flex;
  border-radius: inherit;
  margin-right: var(--margin-right);

  .color-box {
    width: var(--box-size);
    height: var(--box-size);
    border-radius: inherit;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    background: var(--background);
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;

    div {
      color: white;
      font-weight: 800;
      font-size: 24px;
      text-align: center;
      word-break: keep-all;
      word-wrap: break-word;
    }

    &:hover {
      box-shadow: var(--box-shadow);
    }
  }

  .opacity-box {
    position: relative;

    &:first-child {
      border-radius: 0 4px 0 0;
    }

    &:last-child {
      border-radius: 0 0 4px 0;
    }

    .opcaty-kunai {
      position: absolute;
      right: -90px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>

<style lang="less">
.slide-box {
  position: absolute;
  bottom: 0;
  right: 0;
  width: var(--slide-size);
  height: var(--slide-size);
  transition: all 0.5s ease-in-out;
  -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%);
  display: flex;
  justify-content: right;
  align-items: center;

  .inner-box {
    transition: all 0s;
    transform: translate(0, var(--box-size));
    width: var(--label-size);
    height: var(--label-size);
    color: white;
    font-weight: 800;
    text-align: center;
    font-size: 24px;
    word-break: keep-all;
    word-wrap: break-word;
  }
}
</style>
