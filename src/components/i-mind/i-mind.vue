<template>
  <div class="mind" :style="getMindStyle">
    <canvas ref="mind" />
    <input ref="nodeInput" type="text" class="nodeInput" :style="getInputStyle" @input="handleInput"
      @change="handleInputChange" />
  </div>
</template>

<script setup name="i-mind">
import {
  computed,
  getCurrentInstance,
  onMounted,
  watch,
  reactive,
  ref,
} from "vue";

const emits = defineEmits([
  "treeChange",
  "nodeClick",
  "nodeEdit",
  "addNode",
  "deleteNode",
  "dragNodeStart",
  "dragNodeEnd",
]);

const props = defineProps({
  tree: {
    type: Object,
    default() {
      return {};
    },
  },
  maxWidth: {
    type: Number,
    default: 800,
  },
  ligatureType: {
    type: String,
    default: "fold",
  },
  // 节点之间的竖直间距
  verticalGap: {
    type: Number,
    default: 30,
  },
  // 节点之间的水平间距
  horizonGap: {
    type: Number,
    default: 150,
  },
  // 水平内边距
  horizonPadding: {
    type: Number,
    default: 15,
  },
  // 默认边框颜色
  defaultStrokeStyle: {
    type: String,
    default: "#FFE384",
  },
  // 悬浮时边框颜色
  hoverStrokeStyle: {
    type: String,
    default: "#FF0000",
  },
  // 边框粗细
  lineWidth: {
    type: Number,
    default: 2,
  },
  // 字体颜色
  fillStyle: {
    type: String,
    default: "black",
  },
  // 字体样式
  fontStyle: {
    type: String,
    default: "normal 24px 微软雅黑",
  },
  // 连线粗细
  ligatureLineWidth: {
    type: Number,
    default: 1,
  },
  // 连线颜色
  ligatureStrokeStyle: {
    type: String,
    default: "lightblue",
  },
  // 按钮的半径
  buttonRadius: {
    type: Number,
    default: 12,
  },
  // 按钮的填充色
  buttonBackgroundColor: {
    type: String,
    default: "purple",
  },
  // 节点被拖动时的边框色
  nodeInDragStrokeStyle: {
    type: String,
    default: "gray",
  },
  // 节点被拖动时的填充色
  nodeInDragFillStyle: {
    type: String,
    default: "gray",
  },
  // 折线延长线的长度
  foldLineLength: {
    type: Number,
    default: 50,
  },
});

const canvasAttrs = {
  width: undefined,
  height: undefined,
  // 判定双击的最长间隔
  doubleClickDelay: 300,
};
const nodeAttrs = {
  height: 50,
  verticalGap: props.verticalGap,
  horizonGap: props.horizonGap,
  horizonPadding: props.horizonPadding,
  defaultStrokeStyle: props.defaultStrokeStyle,
  hoverStrokeStyle: props.hoverStrokeStyle,
  lineWidth: props.lineWidth,
  fillStyle: props.fillStyle,
  fontStyle: props.fontStyle,
  ligatureLineWidth: props.ligatureLineWidth,
  ligatureStrokeStyle: props.ligatureStrokeStyle,
  buttonRadius: props.buttonRadius,
  buttonBackgroundColor: props.buttonBackgroundColor,
  nodeInDragStrokeStyle: props.nodeInDragStrokeStyle,
  nodeInDragFillStyle: props.nodeInDragFillStyle,
  foldLineLength: props.foldLineLength,
};
const input = reactive({
  top: undefined,
  left: undefined,
  width: undefined,
  height: undefined,
  fontSize: undefined,
  show: false,
});
const rootPreCoordinate = {
  x: undefined,
  y: undefined,
};
const instance = getCurrentInstance().proxy;
const searchArray = new Array();

let hoverNodeId = ref("");
let renderTree = null;
let animating = false;
let requestAnimation = null;
let editNode = {
  target: null,
  showButton: false,
  addButton: {
    label: undefined,
    id: undefined,
    x: undefined,
    y: undefined,
    r: undefined,
  },
  deleteButton: {
    label: undefined,
    id: undefined,
    x: undefined,
    y: undefined,
    r: undefined,
  },
};
let dragEvent = {
  target: null,
  startX: undefined,
  startY: undefined,
  changeX: undefined,
  changeY: undefined,
  parent: null,
};
let clickEvent = {
  target: null,
  time: new Date(),
};

const getInputStyle = computed(() => {
  const top = input.top + "px";
  const left = input.left + "px";
  const height = input.height + "px";
  const fontSize = input.fontSize + "px";
  const width = input.width + "px";
  const display = input.show ? "block" : "none";
  return {
    top,
    left,
    height,
    fontSize,
    width,
    display,
  };
});

const getMindStyle = computed(() => {
  const width = props.maxWidth + "px";
  const cursor = hoverNodeId.value ? "pointer" : "default";

  return {
    width,
    cursor,
  };
});

// 渲染画布内容
const render = () => {
  // 1.绑定画图函数 2.清空画布 3.渲染树 4.重新绑定事件

  // 绘制节点
  CanvasRenderingContext2D.prototype.roundRect = function (arg) {
    const attrs = nodeAttrs;
    const { id, x, y, width, label } = arg;
    const {
      fontStyle = attrs.fontStyle,
      fillStyle = nodeAttrs.fillStyle,
      strokeStyle = attrs.defaultStrokeStyle,
      lineWidth = attrs.lineWidth,
    } = arg;

    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
    this.font = fontStyle;
    this.fillStyle = fillStyle;

    const height = nodeAttrs.height;
    const radius = 8;
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    if (!input.show || editNode.target?.id !== id)
      this.fillText(label, x + 15, y + 35);
    this.closePath();

    return this;
  };
  // 绘制父子节点之间连线
  CanvasRenderingContext2D.prototype.ligature = function (arg) {
    const { start, end } = arg;

    const middle = {
      x: start.x + nodeAttrs.foldLineLength,
      y: start.y,
    };

    this.lineWidth = nodeAttrs.ligatureLineWidth;
    this.strokeStyle = nodeAttrs.ligatureStrokeStyle;

    switch (props.ligatureType) {
      case "straight":
        this.beginPath();
        this.moveTo(start.x, start.y);
        this.lineTo(end.x, end.y);
        this.stroke();
        break;
      case "curve":
        this.beginPath();
        this.moveTo(start.x, start.y);
        this.lineTo(middle.x, middle.y);
        this.stroke();

        this.beginPath();
        this.moveTo(middle.x, middle.y);

        this.quadraticCurveTo(middle.x, end.y, end.x, end.y);
        this.stroke();
        break;
      case "fold":
        this.beginPath();
        this.moveTo(start.x, start.y);
        this.lineTo(middle.x, middle.y);
        this.stroke();

        this.beginPath();
        this.moveTo(middle.x, middle.y);
        this.lineTo(middle.x, end.y);
        this.stroke();

        this.beginPath();
        this.moveTo(middle.x, end.y);
        this.lineTo(end.x, end.y);
        this.stroke();
        break;
      default:
        this.beginPath();
        this.moveTo(start.x, start.y);
        this.lineTo(middle.x, middle.y);
        this.stroke();

        this.beginPath();
        this.moveTo(middle.x, middle.y);
        this.lineTo(middle.x, end.y);
        this.stroke();

        this.beginPath();
        this.moveTo(middle.x, end.y);
        this.lineTo(end.x, end.y);
        this.stroke();
    }

    return this;
  };
  // 绘制按钮
  CanvasRenderingContext2D.prototype.button = function (arg) {
    const { x, y, r, type, fillStyle = nodeAttrs.buttonBackgroundColor } = arg;

    this.fillStyle = fillStyle;
    this.strokeStyle = "transparent";
    this.lineWidth = 0;

    this.beginPath(); //创建一个路径
    this.moveTo(x + r, y);
    this.arc(x, y, r, 0, 2 * Math.PI);
    this.closePath();

    this.fill();

    const icon = {
      r: 6,
    };

    this.moveTo(x - icon.r, y);
    this.lineTo(x + icon.r, y);
    this.strokeStyle = "white";
    this.stroke();

    if (type === "add") {
      this.beginPath();
      this.moveTo(x, y + icon.r);
      this.lineTo(x, y - icon.r);
      this.strokeStyle = "white";
      this.stroke();
    }

    return this;
  };
  // 绘制一个包裹着整个子树的虚线框
  CanvasRenderingContext2D.prototype.dashedBox = function (node) {
    const { x, y, subtreeHeight } = node;
    const height = subtreeHeight + 30;
    const width = getFarthestX(node) - node.x + 30;

    // 虚线框左侧边的中点
    const rawCoordinate = {
      x: x - 15,
      y: y + nodeAttrs.height / 2,
    };
    // 虚线框的四角
    const corner = [
      {
        x: rawCoordinate.x,
        y: rawCoordinate.y + height / 2,
      },
      {
        x: rawCoordinate.x + width,
        y: rawCoordinate.y + height / 2,
      },
      {
        x: rawCoordinate.x + width,
        y: rawCoordinate.y - height / 2,
      },
      {
        x: rawCoordinate.x,
        y: rawCoordinate.y - height / 2,
      },
    ];
    this.setLineDash([10, 10]);
    for (let i = 0; i < corner.length; i++) {
      const start = corner[i];
      const end = corner[(i + 1) % 4];
      this.beginPath();
      this.moveTo(start.x, start.y);
      this.lineTo(end.x, end.y);
      this.stroke();
    }

    return this;
  };

  clearCanvas();
  treeRender();
  const canvas = instance.$refs.mind;
  canvas.removeEventListener("click", handleCanvasClick);
  canvas.removeEventListener("mousemove", handleCanvasMouseMove);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("mousemove", handleCanvasMouseMove);
};
// 清空画布
const clearCanvas = () => {
  const canvas = instance.$refs.mind;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
// 渲染树
const treeRender = () => {
  const canvas = instance.$refs.mind;
  // 计算子树高度
  getSubtreeHeight(renderTree);
  // 根据整个树的高度重新计算画布的高度
  canvas.height = renderTree.subtreeHeight + 300;
  canvasAttrs.height = canvas.height;

  // rootPreCoordinate代表根节点拖动前的坐标 当拖动结束后会更新 这里是为他赋初值(从左开始 上下居中)
  if (!rootPreCoordinate.x) rootPreCoordinate.x = 50;
  if (!rootPreCoordinate.y)
    rootPreCoordinate.y = (renderTree.subtreeHeight + 300) / 2;

  renderTree.x = rootPreCoordinate.x;
  renderTree.y = rootPreCoordinate.y;

  // 如果拖拽的是根节点 则根节点新坐标 = 拖动前坐标 + 拖拽开始后的偏移量
  if (dragEvent.target?.id === renderTree.id) {
    renderTree.x += dragEvent.changeX;
    renderTree.y += dragEvent.changeY;
  }

  searchArray.length = 0;
  searchArray.push(renderTree);
  // 计算每个节点的坐标和宽度 并根据最右侧的节点更新画布的宽度
  getRenderTreeAttrs(renderTree);
  renderNodes(renderTree);
  buttonRender();
};
// 计算每个子树的高度(横向)
const getSubtreeHeight = (node) => {
  // 叶子节点
  const children = node?.children;
  if (!children || children.length === 0)
    return (node.subtreeHeight = nodeAttrs.height);
  let height = 0;
  for (let child of children)
    height += getSubtreeHeight(child) + nodeAttrs.verticalGap;
  height -= nodeAttrs.verticalGap;
  return (node.subtreeHeight = height);
};
// 计算每个节点用来渲染的属性(x,y,width)
const getRenderTreeAttrs = (node) => {
  const canvas = instance.$refs.mind;
  const ctx = canvas.getContext("2d");
  const { label, fontStyle = "normal 24px 微软雅黑" } = node;

  // 根据节点的文字计算宽度
  ctx.font = fontStyle;
  let width = 0;
  if (node.label) for (let char of label) width += ctx.measureText(char).width;
  node.width = width + 2 * nodeAttrs.horizonPadding;

  // 更新画布宽度
  const curX = Math.max(Math.ceil(node.x + node.width) + 50, props.maxWidth);

  if (curX > canvas.width) {
    canvas.width = curX;
    canvasAttrs.width = curX;
  }

  // 计算子节点的x y
  const children = node?.children;
  if (!children || children.length === 0) return;
  const x = node.x + node.width + nodeAttrs.horizonGap;
  let top = node.y - node.subtreeHeight / 2;
  for (let child of children) {
    child.x = x;
    child.y = top + child.subtreeHeight / 2;
    top += child.subtreeHeight + nodeAttrs.verticalGap;
    getRenderTreeAttrs(child);
    searchArray.push(child);
  }
};
// 递归渲染所有节点
const renderNodes = (node) => {
  const canvas = instance.$refs.mind;
  const ctx = canvas.getContext("2d");

  // 如果正在拖拽节点
  if (dragEvent.target) {
    resetState();
    // 如果拖动的是根节点 拖动整棵树
    if (dragEvent.target?.id === renderTree.id) {
      ctx.dashedBox(renderTree).stroke();
      ctx.setLineDash([]);
    } else if (dragEvent.target?.id === node.id) {
      // 如果拖动的是其他节点 则遍历到该节点时复制一个相同的节点并根据拖动偏移量计算出新位置并找到离它最近的节点模拟为新的父节点
      const newNode = Object.assign({}, node);
      newNode.x += dragEvent.changeX;
      newNode.y += dragEvent.changeY;

      ctx.roundRect(newNode).stroke();
      ctx.dashedBox(node).stroke();
      ctx.setLineDash([]);

      // 找到离当前位置最近的节点作为模拟的父节点并绘制连线
      const parent = getCloseNode(newNode);
      dragEvent.parent = parent;
      ctx.beginPath();
      ctx.moveTo(parent.x + parent.width, parent.y + nodeAttrs.height / 2);
      ctx.lineTo(newNode.x, newNode.y + nodeAttrs.height / 2);
      ctx.stroke();
    }
  }

  // 绘制节点
  ctx.roundRect(node).stroke();

  const children = node?.children;
  if (!children || children.length === 0) return;
  for (let child of children) {
    const start = { x: node.x + node.width, y: node.y + nodeAttrs.height / 2 };
    const end = { x: child.x, y: child.y + nodeAttrs.height / 2 };
    ctx.ligature({ start, end }).stroke();
    renderNodes(child);
  }
};
// 渲染按钮
const buttonRender = () => {
  if (!editNode.showButton) return;
  const canvas = instance.$refs.mind;
  const ctx = canvas.getContext("2d");
  ctx.button(editNode.addButton).stroke();
  ctx.button(editNode.deleteButton).stroke();
};
// 清空按钮状态
const resetState = () => {
  editNode = reactive({
    target: null,
    showButton: false,
    showInput: false,
    addButton: {
      label: undefined,
      id: undefined,
      x: undefined,
      y: undefined,
      r: undefined,
    },
    deleteButton: {
      label: undefined,
      id: undefined,
      x: undefined,
      y: undefined,
      r: undefined,
    },
  });
};
// 画布点击事件转发 (点击对象 点击类型)
const handleCanvasClick = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  const target = searchNode(x, y);
  const time = new Date();
  if (target) {
    if (target?.type) {
      if (target.type === "add") addNode(editNode.target);
      else if (target.type === "delete") deleteNode(editNode.target);
    } else if (target.id == clickEvent.target?.id) {
      // 如果点击的是同一个目标则根据间距判断双击事件
      if (Math.abs(clickEvent.time - time) < canvasAttrs.doubleClickDelay)
        handleNodeDoubleClick(target);
      else handleNodeClick(target);
    } else handleNodeClick(target);
  } else {
    // 点击空白区域
    handleInvalidClick();
  }
  // 更新上一次的点击对象
  clickEvent = {
    target,
    time,
  };
};
// 画布鼠标悬浮事件转发
const handleCanvasMouseMove = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  const target = searchNode(x, y);
  const old = hoverNodeId.value;

  if (target) hoverNodeId.value = target.id;
  else hoverNodeId.value = "";

  // 悬浮状态发生了变化 遍历树更新节点的样式
  if (hoverNodeId.value !== old) {
    const ergodicTree = (node) => {
      if (!node) return;
      if (node.id === old)
        return (node.strokeStyle = nodeAttrs.defaultStrokeStyle);
      if (node.id === hoverNodeId.value)
        return (node.strokeStyle = nodeAttrs.hoverStrokeStyle);
      if (node.children) for (let child of node.children) ergodicTree(child);
    };
    ergodicTree(renderTree);
    render();
  }
};
// 根据坐标返回元素
const searchNode = (x, y) => {
  // 判断按钮
  if (editNode.showButton) {
    let button = editNode.addButton;
    let circle = {
      x: button.x,
      y: button.y,
      r: button.r,
    };
    const coordinate = {
      x,
      y,
    };
    if (isCircleInclude(circle, coordinate)) return button;
    button = editNode.deleteButton;
    circle = {
      x: button.x,
      y: button.y,
      r: button.r,
    };
    if (isCircleInclude(circle, coordinate)) return button;
  }

  // 判断节点
  for (let node of searchArray) {
    const area = {
      xStart: node.x,
      xEnd: node.x + node.width,
      yStart: node.y,
      yEnd: node.y + nodeAttrs.height,
    };
    if (
      x >= area.xStart &&
      x <= area.xEnd &&
      y >= area.yStart &&
      y <= area.yEnd
    )
      return node;
  }

  return null;
};
// 判断坐标是否在圆内
const isCircleInclude = (circle, coordinate) => {
  // 圆心坐标和半径
  const { x, y, r } = circle;
  //首先应该在正方形区域内
  if (
    coordinate.x >= x - r &&
    coordinate.x <= x + r &&
    coordinate.y >= y - r &&
    coordinate.y <= y + r
  ) {
    const absX = Math.abs(x - coordinate.x);
    const absY = Math.sqrt(r * r - absX * absX);
    if (absY <= r) return true;
  }
  return false;
};
// 点击空白区域
const handleInvalidClick = () => {
  input.show = false;
  resetState();
  render();
};
// 节点被单击
const handleNodeClick = (node) => {
  const addButton = {
    label: `${node.label}的添加按钮`,
    id: `${node.label}的添加按钮`,
    x: node.x + node.width + 15,
    y: node.y + nodeAttrs.height / 2,
    r: nodeAttrs.buttonRadius,
    type: "add",
  };
  const deleteButton = {
    label: `${node.label}的删除按钮`,
    id: `${node.label}的删除按钮`,
    x: node.x - 15,
    y: node.y + nodeAttrs.height / 2,
    r: nodeAttrs.buttonRadius,
    type: "delete",
  };
  editNode = reactive({
    target: node,
    addButton,
    deleteButton,
    showButton: true,
    showInput: false,
  });
  render();
  emits("nodeClick", node);
};
// 节点被双击
const handleNodeDoubleClick = (node) => {
  // 当前节点进入编辑状态
  editNode.target = node;
  editNode.showButton = false;
  getInputAttr(node);
  render();
  emits("nodeEdit", node);
};
// 计算Input的属性
const getInputAttr = (node) => {
  const nodeInput = instance.$refs.nodeInput;
  nodeInput.value = node.label;
  input.top = node.y + 9;
  input.left = node.x + 13;
  input.fontSize = 24;
  input.height = 30;
  input.show = true;
};
// 输入变化回调
const handleInput = (e) => {
  const nodeInput = instance.$refs.nodeInput;
  editNode.target.label = nodeInput.value;
  // id不能更新否则待会无法找到节点
  // editNode.target.id = getRandomNodeId(nodeInput.value);
  render();
  // 动态更新输入框的长度
  input.width = editNode.target.width - 30;
};
// 输入完成回调
const handleInputChange = (e) => {
  // 输入完成后返回修改后的树
  const target = editNode.target;
  const newLabel = instance.$refs.nodeInput.value;
  const newTree = Object.assign({}, props.tree);
  const ergodicTree = (node) => {
    if (node.id === target.id) {
      node.label = newLabel;
      node.id = getRandomNodeId(newLabel);
      return;
    }
    if (node.children && node.children.length !== 0)
      for (let child of node.children) ergodicTree(child);
  };
  ergodicTree(newTree);
  emits("treeChange", newTree);
  input.show = false;
  render();
};
// 在一个节点的末位添加一个新节点
const addNode = (target) => {
  resetState();
  const newNode = {
    label: "新节点" + searchArray.length,
    id: getRandomNodeId("新节点" + searchArray.length),
  };
  const ergodicTree = (node) => {
    if (node.id === target.id) {
      if (node.children) node.children.push(newNode);
      else node.children = [newNode];
      return emits("treeChange", newTree);
    }
    if (node.children) for (let child of node.children) ergodicTree(child);
  };
  const newTree = Object.assign({}, props.tree);
  ergodicTree(newTree);
  emits("addNode", target);
};
// 删除一个节点及其子节点
const deleteNode = (target) => {
  resetState();
  const ergodicTree = (node) => {
    if (!node.children || node.children.length === 0) return;
    for (let idx in node.children) {
      const child = node.children[idx];
      if (child.id === target.id) {
        node.children.splice(idx, 1);
        return emits("treeChange", newTree);
      }
      ergodicTree(child);
    }
  };
  const newTree = Object.assign({}, props.tree);
  ergodicTree(newTree);
  emits("deleteNode", target);
};
// 随机生成节点id
const getRandomNodeId = (label) => {
  return label + Date.now() + Math.ceil(Math.random() * 100000);
};
// 绑定拖动事件
const mouseDownAndMove = (el, callback) => {
  el.addEventListener("mousedown", function () {
    // 当鼠标按下时 添加鼠标移动监听
    document.addEventListener("mousemove", callback);
    // 拖动事件的开始
    handleDragStart();
  });
  document.addEventListener("mouseup", function () {
    // 当鼠标松开时 移除鼠标移动监听
    document.removeEventListener("mousemove", callback);
    // 拖动事件的结束
    handleDragOver();
  });
};
// 拖动事件的回调
const handleMouseDownAndMove = (e) => {
  if (!dragEvent.startX || !dragEvent.startY) {
    dragEvent.startX = e.offsetX;
    dragEvent.startY = e.offsetY;
    const target = searchNode(e.offsetX, e.offsetY);
    if (!target?.type) {
      dragEvent.target = target;
      emits("dragNodeStart", target);
    }
  }
  if (!dragEvent.target) return;
  dragEvent.changeX = e.offsetX - dragEvent.startX;
  dragEvent.changeY = e.offsetY - dragEvent.startY;
};
// 拖动事件开始
const handleDragStart = () => {
  dragEvent.startX = undefined;
  dragEvent.startY = undefined;
  // 开启动画
  animating = true;
  animation();
};
// 拖动事件结束
const handleDragOver = () => {
  // 关闭动画
  window.cancelAnimationFrame(requestAnimation);
  animating = false;
  if (dragEvent.target) emits("dragNodeEnd", dragEvent.target);

  // 更新拖动前的根节点坐标
  rootPreCoordinate.x = renderTree.x;
  rootPreCoordinate.y = renderTree.y;

  // 清理被拖拽子树的状态
  const ergodicTreeForCleanState = (node) => {
    if (!node) return;
    node.fillStyle = undefined;
    node.strokeStyle = undefined;
    node.isDragNodeChild = undefined;
    if (node.children && node.children.length !== 0)
      for (let child of node.children) ergodicTreeForCleanState(child);
  };

  ergodicTreeForCleanState(dragEvent.target);

  // 更新被拖拽节点的父节点
  if (dragEvent.parent) {
    const newTree = Object.assign({}, props.tree);
    // 现在原来的树中将该节点删除
    const ergodicTreeForDelete = (node) => {
      if (!node.children || node.children.length === 0) return;
      for (let idx in node.children) {
        const child = node.children[idx];
        if (child.id === dragEvent.target.id)
          return node.children.splice(idx, 1);
        ergodicTreeForDelete(child);
      }
    };

    ergodicTreeForDelete(newTree);

    // 找到父节点并在插入在合适的位置
    const ergodicTreeForInsert = (node) => {
      if (node.id === dragEvent.parent.id) {
        // 如果父节点是叶子节点
        if (!node.children || node.children.length === 0)
          return (node.children = [dragEvent.target]);
        else {
          // 根据拖拽节点的位置插入
          for (let i = node.children.length - 1; i >= 0; i--) {
            const child = node.children[i];
            if (i === 0) return node.children.splice(0, 0, dragEvent.target);
            else if (child.y <= dragEvent.target.y + dragEvent.changeY)
              return node.children.splice(i + 1, 0, dragEvent.target);
          }
        }
      }
      if (node.children && node.children.length !== 0)
        for (let child of node.children) ergodicTreeForInsert(child);
    };

    ergodicTreeForInsert(newTree);

    emits("treeChange", newTree);
  }

  // 清空拖动状态
  dragEvent = {
    target: null,
    startX: undefined,
    startY: undefined,
    changeX: undefined,
    changeY: undefined,
    parent: null,
  };
};
// 开启动画
const animation = () => {
  const renderAnimation = (timeStamp) => {
    render();
    if (animating)
      requestAnimation = window.requestAnimationFrame(renderAnimation);
  };
  requestAnimation = window.requestAnimationFrame(renderAnimation);
};
// 获得一个子树离根节点最远的节点的右侧x坐标 (同时将被拖拽子树的样式改变)
const getFarthestX = (node) => {
  node.fillStyle = nodeAttrs.nodeInDragFillStyle;
  node.strokeStyle = nodeAttrs.nodeInDragStrokeStyle;
  node.isDragNodeChild = true;
  if (!node.children || node.children.length === 0) return node.x + node.width;
  let ans = 0;
  for (let child of node.children) ans = Math.max(ans, getFarthestX(child));
  return ans;
};
// 找到离目标节点最近的节点
const getCloseNode = (target) => {
  // 找到一个节点 他离当前节点的位置最近且不能是当前节点的子节点(包括自身)
  const x = target.x,
    y = target.y + nodeAttrs.height / 2;
  let minDis = 1e9,
    ans = null;
  for (let node of searchArray) {
    if (node.isDragNodeChild) continue;
    const coordinate = {
      x: node.x + node.width,
      y: node.y + nodeAttrs.height / 2,
    };
    const subX = Math.abs(x - coordinate.x);
    const subY = Math.abs(y - coordinate.y);
    const distance = subX * subX + subY * subY;
    if (distance < minDis) {
      ans = node;
      minDis = distance;
    }
  }
  return ans;
};
// dwdqwd

onMounted(() => {
  // 绑定拖动事件
  const canvas = instance.$refs.mind;
  mouseDownAndMove(canvas, handleMouseDownAndMove);
  renderTree = Object.assign({}, props.tree);
  render();
});

watch(
  () => props.tree,
  (newValue, oldValue) => {
    renderTree = Object.assign({}, newValue);
    render();
  }
);
</script>

<style scoped lang="less">
.mind {
  position: relative;
  height: auto;
  overflow: auto;

  .nodeInput {
    border: 0;
    outline: none;
    background-color: transparent;
    position: absolute;
  }
}
</style>
