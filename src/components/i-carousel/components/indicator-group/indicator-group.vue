<template>
  <div class="indicator-group" :style="getIndicatorGroupStyle">
    <div v-for="(,idx) in indicatorCount" :key="idx">
      <dot
        :isActive="idx === activeIdx"
        @click="handleClick(idx)"
        @mouseenter="handleMouseenter(idx)"
        v-if="indicatorType === 'dot'"
      />
      <rectangle
        :isActive="idx === activeIdx"
        @click="handleClick(idx)"
        @mouseenter="handleMouseenter(idx)"
        v-if="indicatorType === 'rectangle'"
      />
    </div>
  </div>
</template>

<script setup name="indicator-group">
import { computed } from "vue";

const props = defineProps({
  // 个数
  indicatorCount: {
    type: Number,
    default: 5,
  },
  // 选中索引
  activeIdx: {
    type: Number,
    default: 0,
  },
  // 触发方式 (hover,click)
  trigger: {
    type: String,
    default: "hover",
  },
  // 指示器类型 (dot,rectangle)
  indicatorType: {
    type: String,
    default: "dot",
  },
  position: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["change"]);

const getIndicatorGroupStyle = computed(() => {
  let bottom;
  if (props.position === "inside") bottom = "15px";
  else bottom = "-20px";
  return {
    bottom,
  };
});

const handleClick = (idx) => {
  if (props.trigger === "click") emit("change", idx);
};

const handleMouseenter = (idx) => {
  if (props.trigger === "hover") emit("change", idx);
};
</script>

<style scoped lang="less">
.indicator-group {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  display: flex;
}
</style>
