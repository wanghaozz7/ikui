<template>
  <div class="sideBar-container">
    <top
      :checkedCount="count"
      :checkedState="checkedState"
      @rootStateChange="handleRootStateChange"
      v-if="showCheckBox"
    />
    <collapse
      :collapseData="tree"
      :totalTree="totalTree"
      :checkedState="checkedState"
      :defaultUnfoldAll="defaultUnfoldAll"
      :defaultCheckedAll="defaultCheckedAll && showCheckBox"
      :rowHeight="rowHeight"
      :nodeStyle="nodeStyle"
      :showCheckBox="showCheckBox"
      @collapseCountChange="handleCollapseCountChange"
      @collapseStateChange="handleCollapseStateChange"
      @nodeChange="handleNodeChange"
    />
  </div>
</template>

<script setup name="i-side-bar">
import { reactive, ref } from "vue";

const props = defineProps({
  // 树形结构
  sideBarData: {
    type: Array,
    default() {
      return [];
    },
  },
  // 每一行的高度
  rowHeight: {
    tpye: Number,
    default: 32,
  },
  // 节点样式
  nodeStyle: {
    type: Object,
    default() {
      return {};
    },
  },
  // 默认全选
  defaultCheckedAll: {
    type: Boolean,
    default: false,
  },
  // 默认展开全部节点
  defaultUnfoldAll: {
    type: Boolean,
    default: true,
  },
  // 是否显示勾选框
  showCheckBox: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["checkedNodeArrayChange", "nodeCheckedChange"]);

// 侧边栏数据的树形结构
const tree = reactive(props.sideBarData);
// 选中的叶子节点的一维数组
const checkedNodeArray = reactive([]);
// 根节点的选中状态
let checkedState = ref("none");
// 选中个数
let count = ref(0);
// 所有节点的个数
let total = 0;

// 获取一个节点的所有叶子节点个数
const getNodeTotal = (node) => {
  let total = 0;
  const children = [];
  // 叶子节点
  if (!node.children || node.children.length === 0) {
    return {
      total: 1,
    };
  }
  for (let child of node.children) {
    const obj = getNodeTotal(child);
    total += obj.total;
    children.push(obj);
  }
  return {
    total,
    children,
  };
};

const children = [];
for (let node of tree) {
  const tmp = getNodeTotal(node);
  total += tmp.total;
  children.push(tmp);
}
const totalTree = {
  total,
  children,
};

// 根节点选中个数变化
const handleCollapseCountChange = (newCount) => {
  count.value = newCount;
};

// 根节点选中状态变化
const handleCollapseStateChange = (state) => {
  checkedState.value = state;
};

// 选中根节点
const handleRootStateChange = (state) => {
  checkedState.value = state;
  if (state === "all") count.value = total;
  else count.value = 0;
};

// 叶子节点选中变化
const handleNodeChange = (node, type) => {
  emit("nodeCheckedChange", node, type);

  if (type === "add") {
    checkedNodeArray.unshift(node);
  } else {
    const index = checkedNodeArray.indexOf(
      checkedNodeArray.find((x) => {
        // 如果节点有id则比较id 没有则比较label
        if (x?.id !== undefined) return x.id === node.id;
        return x.label === node.label;
      })
    );
    checkedNodeArray.splice(index, 1);
  }

  if (props.showCheckBox) emit("checkedNodeArrayChange", checkedNodeArray);
};
</script>

<style scoped lang="less">
.sideBar-container {
  padding: 15px;
  border-right: 1px solid #e6e7eb;
  // border-left: 1px solid #e6e7eb;
}
</style>
