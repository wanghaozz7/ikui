<template>
  <component
    :is="'switch-' + type"
    :defaultValue="modelValue"
    :width="width"
    :height="height"
    @change="handleChange"
  />
</template>

<script setup name="i-switch">
const emits = defineEmits(["update:modelValue", "change"]);

const props = defineProps({
  type: {
    type: String,
    default: "normal",
  },
  modelValue: {
    type: Boolean,
    default: true,
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

const handleChange = (e) => {
  emits("update:modelValue", e);
  emits("change", e);
};
</script>
