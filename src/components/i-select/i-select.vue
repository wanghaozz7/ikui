<template>
  <div class="select-container" :style="getVariable" v-click-outside="handleClickOutside">
    <div class="select-input" :style="getInputStyle" @mouseenter="hoverInput = true" @mouseleave="hoverInput = false">
      <input type="text" readonly :placeholder="placeholder" ref="input" @click="handleClickInput" />
      <div class="arrow" v-show="!(clearable && hoverInput && activeValue)" @click="handleClickInput">
        <arrow :isFold="visible" arrow-color="gray" />
      </div>
      <div class="close" v-show="clearable && hoverInput && activeValue" @click="cancelSelect">
        <img src="../../assets//icons/close.svg" alt="" />
      </div>
    </div>
    <transition name="shrink-in-top">
      <div class="select-dropdown" v-show="visible">
        <div class="dropdown-triangle">
          <div class="inner-triangle"></div>
        </div>
        <div class="dropdown-body" v-if="option.length !== 0">
          <div v-for="(obj, idx) in option" :key="obj" class="row" :class="getRowClass(obj, idx)"
            @click="rowClick(obj, idx)">
            {{ obj.label }}
          </div>
        </div>
        <div class="empty-body" v-else>暂无内容</div>
      </div>
    </transition>
  </div>
</template>

<script setup name="i-select">
import { ref, computed, getCurrentInstance, onMounted, watch } from "vue";

const emits = defineEmits([
  "update:modelValue",
  "select",
  "change",
  "visibleChange",
  "clear",
  "focus",
  "blur",
]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  option: {
    type: Array,
    default() {
      return [];
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  size: {
    type: String,
    default: "medium",
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
});

// 输入框是否聚焦
let focus = ref(false);
// 下拉框是否可见
let visible = ref(false);
// 当前选中的值
let activeValue = ref(undefined);
let hoverInput = ref(false);

const { proxy } = getCurrentInstance();

const getVariable = computed(() => {
  let width, height;

  if (props.width === 0) {
    switch (props.size) {
      case "large":
        width = 360;
        break;
      case "medium":
        width = 240;
        break;
      case "mini":
        width = 120;
        break;
      default:
        width = 240;
    }
  } else width = props.width;

  if (props.height === 0) {
    switch (props.size) {
      case "large":
        height = 50;
        break;
      case "medium":
        height = 35;
        break;
      case "mini":
        height = 25;
        break;
      default:
        height = 35;
    }
  } else height = props.height;

  const inputWidth = width - 30;
  const bottom =
    props.option.length !== 0 ? -1 * (15 + props.option.length * height) : -165;
  const backgroundColor = props.disabled ? "#eee" : "white";
  const cursor = props.disabled ? "not-allowed" : "pointer";
  const userSelect = props.disabled ? "none" : "";
  const hoverBorderColor = props.disabled ? "#eee" : "#d3d3d3";
  return {
    "--height": height + "px",
    "--width": width + "px",
    "--input-width": inputWidth + "px",
    "--input-bgc": backgroundColor,
    "--input-cursor": cursor,
    "--input-user-select": userSelect,
    "--dropdown-bottom": bottom + "px",
    "--hover-border-color": hoverBorderColor,
  };
});

const getInputStyle = computed(() => {
  const borderColor = focus.value ? "#43CD80" : "";
  return {
    borderColor,
  };
});

const getRowClass = computed(() => {
  return (obj, idx) => {
    return [
      obj.disabled ? "disabled-row" : "",
      obj.value === activeValue.value && !obj.disabled ? "hight-light-row" : "",
    ];
  };
});

const handleClickInput = (e) => {
  if (props.disabled) return;
  focus.value = true;
  visible.value = !visible.value;
  const input = proxy.$refs.input;
  input.focus();
};

const handleClickOutside = (e) => {
  if (props.disabled) return;
  focus.value = false;
  visible.value = false;
};

const rowClick = (obj, idx) => {
  if (obj.disabled) return;
  const input = proxy.$refs.input;
  if (input.value !== obj.value) emits("change", obj);
  input.value = obj.label ? obj.label : "";
  activeValue.value = obj.value;
  emits("update:modelValue", obj.value);
  emits("select", obj);
  visible.value = false;
};

const cancelSelect = () => {
  const input = proxy.$refs.input;
  activeValue.value = undefined;
  input.value = "";
  emits("update:modelValue", undefined);
  emits("select", undefined);
  emits("change", undefined);
  emits("clear");
};

const vClickOutside = {
  mounted(el, binding) {
    function eventHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.value && typeof binding.value === "function") {
        binding.value(e);
      }
    }
    el.Tag = eventHandler;
    document.addEventListener("click", eventHandler);
  },
  beforeUnmount(el) {
    document.removeEventListener("click", el.Tag);
    delete el.Tag;
  },
};

onMounted(() => {
  // 赋初值
  if (props.modelValue) {
    const input = proxy.$refs.input;
    const obj = props.option.find((x) => {
      return x.value === props.modelValue;
    });
    input.value = obj?.label ? obj?.label : "";
    activeValue.value = props.modelValue;
  }
});

watch(
  () => visible.value,
  (newVal, oldVal) => {
    emits("visibleChange", newVal);
  }
);

watch(
  () => focus.value,
  (newVal, oldVal) => {
    if (newVal) emits("focus");
    else emits("blur");
  }
);
</script>

<style scoped lang="less">
.select-container {
  position: relative;
  font-size: 14px;
  width: var(--width);

  .select-input {
    display: flex;
    width: var(--width);
    height: var(--height);
    background-color: var(--input-bgc);
    border: 1px solid #eee;
    border-radius: 4px;
    user-select: var(--input-user-select);
    box-sizing: border-box;
    align-items: center;
    cursor: var(--input-cursor);

    input[type="text"] {
      width: var(--input-width);
      background-color: var(--input-bgc);
      cursor: var(--input-cursor);
      height: 100%;
      padding-left: 15px;
      border: 0;
      border-radius: 4px;
      outline: none;
      box-sizing: border-box;
      color: #281f1d;
    }

    .arrow {
      width: 30px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid #979797;
      box-sizing: border-box;
      margin-left: 6px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 8px;
        height: 8px;
      }
    }

    &:hover {
      border-color: var(--hover-border-color);
    }
  }

  .select-dropdown {
    position: absolute;
    left: -1px;
    bottom: var(--dropdown-bottom);
    width: var(--width);
    background-color: #fff;
    color: #281f1d;
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 0 0 8px 0 rgba(232, 237, 258, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    cursor: pointer;
    z-index: 999;

    .dropdown-triangle {
      position: absolute;
      top: -16px;
      left: 50%;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-bottom-color: #dedede;
      transform: translateX(-50%);
      z-index: 999;

      .inner-triangle {
        position: absolute;
        top: -6px;
        left: -7px;
        width: 0;
        height: 0;
        border: 7.5px solid transparent;
        border-bottom-color: #fff;
        z-index: 999;
      }
    }

    .dropdown-body {
      .row {
        height: var(--height);
        padding-left: 15px;
        text-align: left;
        border-top: 1px solid #f5f5f5;
        display: flex;
        align-items: center;
        box-sizing: border-box;

        &:first-child {
          border-color: #fff;
        }

        &:hover {
          background-color: #f0ffff;
        }
      }

      .disabled-row {
        background-color: #eee !important;
        cursor: not-allowed;
      }

      .hight-light-row {
        color: #8470ff;
        font-weight: bold;
        font-size: 18px;
      }
    }

    .empty-body {
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      color: gray;
    }
  }
}
</style>
