<template>
  <div>
    <div class="title">{{ title.text }}</div>
    <div class="desc">{{ title.desc }}</div>
    <i-card class="card-container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <template v-slot:header>
        <div class="header">
          <slot />
        </div>
      </template>
      <div class="code-area">
        <div class="code" :style="codeStyle" ref="code">
          <i-tooltip content="收起代码" placement="bottom" :refreshTooltip="refresh" :openDelay="500" :closeDelay="0">
            <div class="unfold button" @click="handleClick" :style="getButtonStyle">
              <div class="icon" />
            </div>
          </i-tooltip>
          <i-tooltip content="复制代码" placement="bottom" :refreshTooltip="refresh" :openDelay="500" :closeDelay="0">
            <div class="copy button" @click="copyCode" :style="getButtonStyle">
              <div class="icon" />
            </div>
          </i-tooltip>
        </div>
        <div class="extention" @click="handleClick" :style="extentionStyle" v-if="code">
          <transition name="scale-in-out">
            <div class="button" v-show="isHover">
              <div class="icon" :style="iconStyle"></div>
              <div class="text">
                <span v-show="!showCode">看看</span><span v-show="showCode">收起</span>代码~
              </div>
            </div>
          </transition>
        </div>
      </div>
    </i-card>
  </div>
</template>

<script setup name="show-component">
import { ref, computed, onMounted, getCurrentInstance } from "vue";

const props = defineProps({
  code: {
    type: String,
    default: ``,
  },
  title: {
    type: Object,
    default() {
      return {};
    },
  },
  defaultShowCode: {
    type: Boolean,
    default: false,
  },
  refresh: {
    type: Boolean,
    default: false,
  },
});

let showCode = ref(false);
let isHover = ref(false);

const { proxy } = getCurrentInstance();
let maxHeight,
  minHeight = 0,
  codeRef;

const codeStyle = computed(() => {
  const height = showCode.value ? maxHeight : minHeight;
  return {
    height,
  };
});
const iconStyle = computed(() => {
  const rotate = showCode.value ? "180deg" : "";
  const marginTop = showCode.value ? "-2px" : "8px";
  return {
    rotate,
    marginTop,
  };
});
const extentionStyle = computed(() => {
  const borderTop = showCode.value ? "1px solid #ebebeb" : "";
  return {
    borderTop,
  };
});
const getButtonStyle = computed(() => {
  const opacity = isHover.value ? 1 : 0;
  return {
    opacity,
  };
});

const handleClick = () => {
  showCode.value = !showCode.value;
};

const handleMouseEnter = (e) => {
  isHover.value = true;
};

const handleMouseLeave = (e) => {
  isHover.value = false;
};

const getCodeArea = () => {
  // 将String转为代码块
  // 首先将代码块分为三部分 template script style 通过三个标签分开三块区域
  // 对于每块区域 有tag(标签名) attr(键名) string(键值) 以及其他文字部分
  codeRef = proxy.$refs.code;
  const arr = props.code.split("\n");
  for (let row of arr) {
    const div = document.createElement("div");

    div.className = "normalCode";

    let indent = "";
    // 首先记录下每一行开头的缩进量
    for (let char of row) {
      if (char === " ") indent += " ";
      else break;
    }
    const indentSpan = document.createElement("span");
    indentSpan.innerText = indent;
    div.appendChild(indentSpan);

    const words = row.split(" ");
    for (let word of words) {
      const span = document.createElement("span");
      const keyValues = word.split("=");
      if (keyValues.length === 2) {
        const value = keyValues[1];
        const key = keyValues[0] + "=";
        const wordString = document.createElement("span");
        const wordAttr = document.createElement("span");
        if (
          (value.startsWith("'") &&
            (value.endsWith("'") || value.endsWith(","))) ||
          (value.startsWith('"') &&
            (value.endsWith('"') || value.endsWith(",")))
        ) {
          wordString.className = "word-string";
        }

        wordString.innerText = value + " ";
        wordAttr.innerText = key;
        span.appendChild(wordAttr);
        span.appendChild(wordString);
      } else {
        span.innerText = word + " ";
        if (word.endsWith(":")) span.className = "word-key";
        else if (word.endsWith(",")) span.className = "word-string";
      }
      div.appendChild(span);
    }

    codeRef.appendChild(div);
  }
  // 通过代码行数计算出code区域的高度
  maxHeight = arr.length * 24 + "px";
};

const copyCode = () => {
  const input = document.createElement("input");
  input.value = props.code;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  proxy.$message({
    type: "success",
    info: "复制成功",
    delay: 1000,
  });
  document.body.removeChild(input);
};

onMounted(() => {
  getCodeArea();
  if (!props.defaultShowCode) codeRef.style.height = 0;
  else showCode.value = true;
});
</script>

<style lang="less" scoped>
.title {
  font-size: 22px;
  margin-top: 45px;
}

.desc {
  font-size: 14px;
  color: gray;
  margin: 15px 0;
}

.card-container {
  .code-area {
    position: relative;

    .code {
      overflow: hidden;
      font-size: 14px;
      white-space: pre-wrap;
      transition: all 0.2s;
      background-color: #fafafa;
      position: relative;

      .button {
        position: absolute;
        top: 15px;
        width: 35px;
        height: 35px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;
        background-color: #eee;

        &:hover {
          background-color: rgba(199, 199, 199, 0.881);
        }

        .icon {
          width: 20px;
          height: 20px;
        }
      }

      .copy {
        right: 15px;

        .icon {
          background: center / contain no-repeat url(@/assets/icons/copy.svg);
        }
      }

      .unfold {
        right: 60px;

        .icon {
          background: center / contain no-repeat url(@/assets/icons/unfold.svg);
        }
      }
    }

    .extention {
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
      cursor: pointer;

      &:hover {
        background-color: #ebebeb;

        .button .text {
          color: skyblue;
        }

        .button .icon {
          border-top-color: skyblue;
        }
      }

      .button {
        height: 20px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          transition: all 0.3s;
          width: 0;
          height: 0;
          margin: 8px 8px 0 auto;
          border: 6px solid transparent;
          border-top-color: #d3d3d3;
        }

        .text {
          transition: all 0.3s;
          overflow: hidden;
          color: #d3d3d3;
          font-size: 14px;
          user-select: none;
        }
      }
    }
  }
}
</style>
