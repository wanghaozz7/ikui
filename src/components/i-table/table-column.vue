<template>
  <col :width="colWidth" />
</template>

<script setup name="table-column">
import { ref } from "vue";

const props = defineProps({
  width: {
    type: Number,
    default: -1,
  },
  minWidth: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: "",
  },
  prop: {
    type: String,
    default: "",
  },
  align: {},
  headerAlign: {},
});

// 由父节点直接修改
let colWidth = ref(props.width !== -1 ? props.width : props.minWidth);
</script>

<style scoped lang="less"></style>
