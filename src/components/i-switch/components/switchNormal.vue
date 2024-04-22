<template>
  <div style="display: flex; align-items: center">
    <div
      :style="getTextStyle(0)"
      @click="handleClick(0)"
      v-if="inactiveText !== ''"
    >
      {{ inactiveText }}
    </div>
    <div class="toggle normal" :style="variable">
      <input
        :id="id"
        type="checkbox"
        v-model="inputValue"
        @change="handleChange"
        ref="input"
      />
      <label class="toggle-item" :for="id" :style="getLabelStyle" />
    </div>
    <div
      :style="getTextStyle(1)"
      @click="handleClick(1)"
      v-if="activeText !== ''"
    >
      {{ activeText }}
    </div>
  </div>
</template>

<script setup name="switch-normal">
import { ref, computed } from "vue";

const emits = defineEmits(["change", "active", "inactive"]);

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true,
  },
  activeColor: {
    type: String,
    default: "green",
  },
  inactiveColor: {
    type: String,
    default: "red",
  },
  activeText: {
    type: String,
    default: "",
  },
  inactiveText: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 60,
  },
  height: {
    type: Number,
    default: 30,
  },
});

let inputValue = ref(props.defaultValue);

const variable = computed(() => {
  const width = props.width + "px";
  const left = props.width - props.height + "px";
  const height = props.height + "px";
  const button = props.height - 4 + "px";
  const activeColor = props.activeColor;
  const inactiveColor = props.inactiveColor;
  return {
    "--activeColor": activeColor,
    "--inactiveColor": inactiveColor,
    "--width": width,
    "--left": left,
    "--height": height,
    "--button": button,
  };
});

const getLabelStyle = computed(() => {
  const left = !inputValue.value ? "2px" : props.width - props.height + "px";
  const backgroundColor = inputValue.value
    ? props.activeColor
    : props.inactiveColor;
  return {
    "--cur": left,
    "--bgc": backgroundColor,
  };
});

const getTextStyle = computed(() => {
  return (direction) => {
    const lineHeight = props.height + "px";
    const marginLeft = direction === 0 ? "" : "8px";
    const marginRight = direction === 1 ? "" : "8px";
    const cursor = "pointer";
    const color = inputValue.value
      ? direction === 0
        ? "black"
        : "#409EFF"
      : direction === 1
      ? "black"
      : "#409EFF";
    const transition = "all .3s ease";
    return {
      lineHeight,
      marginLeft,
      marginRight,
      cursor,
      color,
      transition,
    };
  };
});

const getRandomNodeId = () => {
  return "normal" + Date.now() + Math.ceil(Math.random() * 100000);
};

const id = getRandomNodeId();

const handleChange = (e) => {
  emits("change", inputValue.value);
  if (inputValue.value) emits("active", true);
  else emits("inactive", false);
};

const handleClick = (flag) => {
  inputValue.value = flag === 1 ? true : false;
};
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;

  &::before,
  &::after {
    content: "";
    position: absolute;
  }
}

body {
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 604px;
    border: 1px solid #f5f5f5;
    flex-wrap: wrap;
    text-align: center;
    font-size: 0;

    > div {
      width: 300px;
      display: inline-block;
      padding: 20px 0;

      &:not(:last-child) {
        &:nth-child(odd) {
          border-right: 1px solid #f5f5f5;
        }
      }

      input {
        width: 0;
        height: 0;
        left: 0;
        top: 0;
        opacity: 0;
        position: absolute;
      }
    }
  }
}

.toggle {
  position: relative;
  display: inline-block;
}

label.toggle-item {
  width: var(--width);
  height: var(--height);
  display: inline-block;
  position: relative;
  transition: all 0.3s ease;
  transform-origin: 20% center;
  border-radius: 50px;
  cursor: pointer;

  &::before {
    display: block;
    width: var(--button);
    height: var(--button);
    top: 1px;
    border-radius: 50%;
    border: 2px solid var(--activeColor);
    transition: 0.3s ease;
  }
}

.normal {
  label {
    border: 0.5px solid rgba(117, 117, 117, 0.31);

    &::before {
      background: #fff;
      border: none;
    }

    &::after {
      width: calc(100% + 8px);
      height: calc(100% + 8px);
      top: -5px;
      left: -4px;
      background: transparent;
      border-radius: 45px;
      z-index: 0;
    }
  }
}

.toggle-item {
  background: var(--bgc);

  &::before {
    left: var(--cur);
  }
}
</style>
