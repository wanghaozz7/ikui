<template>
  <h2 class="title">{{ title }}</h2>
  <i-table
    :data="listData"
    :out-side-border="false"
    :header-cell-style="getHeaderCellStyle"
    :cell-style="getCellStyle"
    :highlight-current-row="false"
    cell-empty-text="—"
    size="big"
  >
    <table-column
      v-for="col in columnList"
      :key="col"
      :label="col.label"
      :prop="col.prop"
    />
  </i-table>
</template>

<script setup name="attribute-list">
const props = defineProps({
  listData: {
    type: Array,
    default() {
      return [];
    },
  },
  // attributes events slot
  type: {
    type: String,
    default: "attributes",
  },
  title: {
    type: String,
    default: "",
  },
});

let columnList;

const getAttributesColumnList = () => {
  return [
    { label: "参数", prop: "params" },
    { label: "说明", prop: "desc" },
    { label: "类型", prop: "type" },
    { label: "可选值", prop: "optional" },
    { label: "默认值", prop: "default" },
  ];
};
const getEventsColumnList = () => {
  return [
    {
      label: "事件名",
      prop: "method",
    },
    {
      label: "说明",
      prop: "desc",
    },
    {
      label: "回调参数",
      prop: "params",
    },
  ];
};
const getSlotColumnList = () => {
  return [
    {
      label: "name",
      prop: "name",
    },
    {
      label: "说明",
      prop: "desc",
    },
  ];
};
const getHeaderCellStyle = () => {
  return {
    fontSize: "14px",
    fontWeight: "500",
  };
};
const getCellStyle = () => {
  return { fontSize: "14px" };
};

switch (props.type) {
  case "attributes":
    columnList = getAttributesColumnList();
    break;
  case "events":
    columnList = getEventsColumnList();
    break;
  case "slot":
    columnList = getSlotColumnList();
    break;
  default:
    columnList = getAttributesColumnList();
}
</script>

<style scoped lang="less">
.title {
  font-weight: 500;
  margin-top: 50px;
}
</style>
