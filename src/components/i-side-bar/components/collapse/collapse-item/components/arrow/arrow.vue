<template>
  <div class="arrow-container">
    <img
      src="@/assets/icons/arrow-down.svg"
      @click="handleClick"
      :style="{ rotate: rotateAngle }"
    />
  </div>
</template>

<script setup name="arrow">
import { computed } from "vue";

const props = defineProps({
  // 是否折叠
  isFold: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["fold"]);

// 箭头旋转的角度
const rotateAngle = computed(() => (props.isFold ? 0 : 180) + "deg");

const handleClick = () => emit("fold", !props.isFold);
</script>

<style scoped lang="less">
.arrow-container {
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    transition: all 0.3s;
  }
}
</style>
