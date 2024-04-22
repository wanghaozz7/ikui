<template>
  <div class="collapse">
    <collapse-item
      v-for="(node, idx) in collapseData"
      :key="node.label"
      :node="node"
      :totalNode="totalTree.children[idx]"
      :fatherCheckedState="checkedState"
      :defaultUnfoldAll="defaultUnfoldAll"
      :defaultCheckedAll="defaultCheckedAll"
      :rowHeight="rowHeight"
      :nodeStyle="nodeStyle"
      :last-click-node-id="lastClickNodeId"
      :showCheckBox="showCheckBox"
      @childCountChange="handleChildCountChange"
      @nodeChange="handleNodeChange"
    />
  </div>
</template>

<script setup name="collapse">
import { ref, watch } from "vue";

const props = defineProps({
  collapseData: {
    type: Array,
    default() {
      return [];
    },
  },
  rowHeight: {
    tpye: Number,
    default: 32,
  },
  nodeStyle: {
    type: Object,
    default() {
      return {};
    },
  },
  totalTree: {
    type: Object,
    default() {
      return {};
    },
  },
  checkedState: {
    type: String,
    default: "none",
  },
  defaultUnfoldAll: {
    type: Boolean,
    default: true,
  },
  defaultCheckedAll: {
    type: Boolean,
    default: false,
  },
  showCheckBox: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits([
  "collapseCountChange",
  "collapseStateChange",
  "nodeChange",
]);

// 根节点的选中状态
let checkedState = ref("none");
// 选中个数
let count = ref(0);
// 叶子节点总数
const total = props.totalTree.total;

let lastClickNodeId = ref("");

// 收集每个子节点的变化并更新
const handleChildCountChange = (change) => {
  count.value += change;
  // 当count变化后重新计算state
  if (count.value == total) checkedState.value = "all";
  else if (count.value == 0) checkedState.value = "none";
  else checkedState.value = "part";
  emit("collapseCountChange", count.value);
  emit("collapseStateChange", checkedState.value);
};

// 叶子节点选中变化
const handleNodeChange = (node, type) => {
  emit("nodeChange", node, type);
  lastClickNodeId.value = node.id;
};

// 监听父节点的全选状态(单向向下)
watch(
  () => props.checkedState,
  (newValue, oldValue) => {
    if (newValue == "all") {
      count.value = total;
      checkedState.value = "all";
    } else if (newValue == "none") {
      count.value = 0;
      checkedState.value = "none";
    }
  }
);
</script>

<style scoped lang="less">
.collapse {
  // 去除双击后选择文字
  -moz-user-select: none;
  /*火狐*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  -ms-user-select: none;
  /*IE10*/
  -khtml-user-select: none;
  /*早期浏览器*/
  user-select: none;
}
</style>
