<template>
  <div class="collapse-item" :style="{ height: getHeight + 'px' }">
    <div class="show-part" @click.self="handleClick" :style="getShowPartStyle">
      <div
        class="left-part"
        @click="handleClick"
        :style="{ 'margin-left': getLeftOffset + 'px' }"
      >
        <arrow :isFold="isFold" v-if="!isLeaf()" />
        <div class="text" :style="getTextStyle">
          {{ node.label }}
        </div>
      </div>
      <check-box
        @check="handleCheck"
        :checkedState="checkedState"
        v-if="showCheckBox"
      />
    </div>
    <div ref="hiddenPart">
      <collapse-item
        v-for="(children, index) in node.children"
        :key="children.id"
        :node="children"
        :totalNode="totalNode.children[index]"
        :fatherCheckedState="checkedState"
        :offset="offset + 5"
        :rowHeight="rowHeight"
        :node-style="nodeStyle"
        :defaultUnfoldAll="defaultUnfoldAll"
        :default-checked-all="defaultCheckedAll"
        :last-click-node-id="lastClickNodeId"
        :showCheckBox="showCheckBox"
        @childCountChange="handleChildCountChange"
        @nodeChange="handleNodeChange"
        @heightChange="handleHeightChange"
      />
    </div>
  </div>
</template>

<script setup name="collapse-item">
import { ref, computed, getCurrentInstance, onMounted, watch } from "vue";

const props = defineProps({
  // 节点本身({label:'',children:[],defaultChecked: boolean})
  node: {
    type: Object,
    default() {
      return {};
    },
  },
  // 节点包含的叶子节点个数(树形)
  totalNode: {
    type: Object,
    default() {
      return {};
    },
  },
  // 父节点的选中状态
  fatherCheckedState: {
    type: String,
    default: "none",
  },
  // 行高(每一行不同的话放到node中)
  rowHeight: {
    type: Number,
    default: 32,
  },
  // 节点样式
  nodeStyle: {
    type: Object,
    default() {
      return {};
    },
  },
  // 父节点偏移量
  offset: {
    type: Number,
    default: 0,
  },
  // 默认展开所有节点
  defaultUnfoldAll: {
    type: Boolean,
    default: true,
  },
  // 默认选中所有节点
  defaultCheckedAll: {
    type: Boolean,
    default: false,
  },
  // 最后一次被点击的节点的id
  lastClickNodeId: {
    type: String,
    default: "",
  },
  // 是否显示勾选框
  showCheckBox: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["heightChange", "childCountChange", "nodeChange"]);

// 是否被选中
let checkedState = ref("none");
// 是否折叠
let isFold = ref(true);
// 计算隐藏部分的总高度
let hiddenPartHeight = ref(0);
// 选中的叶子节点个数
let count = ref(0);
// 行宽
let rowWidth = ref(209);

// 展示部分的高度(传参可以改变)
const showPartHeight = props.rowHeight;
// 总叶子节点个数
const total = props.totalNode.total;
// 上下文context
const { proxy } = getCurrentInstance();

// 计算总高度
const getHeight = computed(() => {
  return isFold.value
    ? showPartHeight
    : hiddenPartHeight.value + showPartHeight;
});

// 计算左侧的偏移量
const getLeftOffset = computed(() => {
  return props.offset + (isLeaf() ? 15 : 0);
});

const getTextStyle = computed(() => {
  const lineHeight = props.rowHeight + "px";
  const maxWidth =
    rowWidth.value -
    (props.showCheckBox ? 69 : 40) -
    getLeftOffset.value +
    (isLeaf() ? 15 : 0) +
    "px";
  return Object.assign(props.nodeStyle, {
    lineHeight,
    maxWidth,
  });
});

const getShowPartStyle = computed(() => {
  const backgroundColor = props.showCheckBox
    ? ""
    : props.lastClickNodeId === props.node.id
    ? "rgba(173,216,230,0.3)"
    : "";
  return {
    backgroundColor,
  };
});

// 当前节点被点击
const handleCheck = (state) => {
  // 更新状态
  checkedState.value = state;
  // 点击后的状态只能是全选或者全不选 (通过props直接改变所有子节点的状态(不断向下),通过事件将变化的个数发送父节点修改并重新计算状态(不断向上))
  if (state == "all") {
    const change = total - count.value;
    count.value = total;
    emit("childCountChange", change);
  } else {
    const change = 0 - count.value;
    count.value = 0;
    emit("childCountChange", change);
  }
};

// 行被点击(选中或展开)
const handleClick = () => {
  // 如果是叶子节点则选中
  if (isLeaf()) {
    let newState;
    switch (checkedState.value) {
      case "all":
        newState = "none";
        break;
      case "part":
        newState = "all";
        break;
      case "none":
        newState = "all";
        break;
      default:
        newState = "none";
    }
    handleCheck(newState);
  }
  // 如果不是则展开/折叠
  else isFold.value = !isFold.value;
};

// 是否叶子节点
const isLeaf = () => {
  return props.node.children === undefined || props.node.children.length === 0;
};

// 叶子节点选中变化
const handleNodeChange = (node, type) => emit("nodeChange", node, type);

// 更新隐藏部分高度(单向向上)
const handleHeightChange = (height) => {
  hiddenPartHeight.value += height;
  emit("heightChange", height);
};

// 子节点count改变(单向向上)
const handleChildCountChange = (change) => {
  count.value += change;
  // 当count变化后重新计算state
  if (count.value == total) checkedState.value = "all";
  else if (count.value == 0) checkedState.value = "none";
  else checkedState.value = "part";
  // 向上传递
  emit("childCountChange", change);
};

onMounted(() => {
  // 获取隐藏部分的高度
  hiddenPartHeight.value = proxy.$refs.hiddenPart.offsetHeight;
  // 获取行宽
  rowWidth.value = proxy.$refs.hiddenPart.offsetWidth;

  // 节点是否展开 (就近原则:在节点中声明了的状态大于全局状态)
  if (props.node.defaultUnfold === undefined) {
    isFold.value = !props.defaultUnfoldAll;
  } else {
    isFold.value = !props.node.defaultUnfold;
  }

  // 节点是否选中 (就近原则:在节点中声明了的状态大于全局状态)
  if (props.node.defaultChecked === undefined) {
    if (isLeaf() && props.defaultCheckedAll) {
      checkedState.value = "all";
      handleChildCountChange(1);
    }
  } else {
    if (isLeaf() && props.node.defaultChecked) {
      checkedState.value = "all";
      handleChildCountChange(1);
    }
  }
});

// 监听折叠状态
watch(
  // 当子节点高度变化 通知父节点高度变化(值相同)
  () => isFold.value,
  (newValue, oldValue) => {
    if (newValue) emit("heightChange", -hiddenPartHeight.value);
    else emit("heightChange", hiddenPartHeight.value);
  }
);

// 监听父节点的全选状态(单向向下)
watch(
  () => props.fatherCheckedState,
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

// 监听选中状态不是为了改变其他节点的选中状态 而是在叶子节点被选中时将选中情况返回
watch(
  () => checkedState.value,
  (newValue, oldValue) => {
    if (!isLeaf()) return;
    if (newValue === "all") emit("nodeChange", props.node, "add");
    // 理论上叶子节点不会有part状态
    else if (newValue === "none") emit("nodeChange", props.node, "delete");
  }
);
</script>

<script>
export default { name: "collapseItem" };
</script>

<style scoped lang="less">
.collapse-item {
  width: 100%;
  overflow: hidden;
  transition: all 0.3s;

  .show-part {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    padding: 0 10px;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }

    .left-part {
      display: flex;
      align-items: center;
      .text {
        font: normal 14px 微软雅黑;
        margin-left: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
