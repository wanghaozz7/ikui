<template>
  <div class="table-container" :style="tableStyle" ref="table" v-resize:20="onResize">
    <div v-if="showHeader" ref="tableHeader">
      <table cellspacing="0">
        <colgroup ref="headerColgroup">
          <slot />
        </colgroup>
        <tr :class="headerRowClass">
          <th v-for="(prop, idx) in columnsProps" :key="prop.label" :style="headerCellStyle(prop.prop, idx)">
            {{ prop.label }}
          </th>
        </tr>
      </table>
    </div>
    <div class="body-wrapper" :style="tableBodyStyle" ref="tableBody">
      <table cellspacing="0">
        <colgroup ref="bodyColgroup">
          <slot />
        </colgroup>
        <tr v-for="(row, rowIndex) in data" :key="row" :class="tableRowClass(row, rowIndex)">
          <td v-for="(colValue, colKey, colIndex) in row" :key="colValue"
            :style="tableCellStyle(row, colValue, rowIndex, colIndex)">
            {{ getLabel(row, colIndex) }}
          </td>
        </tr>
      </table>
    </div>
    <div class="empty" v-if="data.length === 0">{{ emptyText }}</div>
  </div>
</template>

<script setup name="i-table">
import {
  onMounted,
  getCurrentInstance,
  reactive,
  computed,
  ref,
  nextTick,
} from "vue";

const props = defineProps({
  data: {
    type: Array,
    default() {
      return [];
    },
  },
  height: {
    type: Number,
    default: -1,
  },
  maxHeight: {
    type: Number,
    default: -1,
  },
  stripe: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false,
  },
  outSideBorder: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: "medium",
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  highlightCurrentRow: {
    type: Boolean,
    default: true,
  },
  cellStyle: {
    type: [Function, Object],
    default() {
      return {};
    },
  },
  headerCellStyle: {
    type: [Function, Object],
    default() {
      return {};
    },
  },
  rowClassName: {
    type: [Function, String],
    default() {
      return "";
    },
  },
  headerRowClassName: {
    type: [Function, String],
    default() {
      return "";
    },
  },
  emptyText: {
    type: String,
    default: "暂无内容",
  },
  cellEmptyText: {
    type: String,
    default: "",
  },
});

const columnsProps = reactive([]);
const colWidthArr = reactive([]);
let showScrollBar = ref(false);
let bodyHeight = ref("auto");

const { proxy } = getCurrentInstance();
const normalBorder = "1px solid #ebebeb";
const noBorder = "0px solid transparent";

const tableStyle = computed(() => {
  const height = props.height === -1 ? "auto" : props.height + "px";
  const maxHeight = props.maxHeight === -1 ? "" : props.maxHeight + "px";
  const border = props.outSideBorder ? normalBorder : "";
  return {
    height,
    maxHeight,
    border,
  };
});
const tableBodyStyle = computed(() => {
  const height = bodyHeight.value + "px";
  // 如果有border且表头被隐藏
  const borderTop = !props.showHeader ? (props.border ? normalBorder : "") : "";
  const finalStyle = {
    height,
    borderTop,
  };
  return props.data.length === 0
    ? Object.assign(finalStyle, { border: noBorder })
    : finalStyle;
});
const tableRowClass = computed(() => {
  return (row, rowIndex) => {
    const getCallBackClassName = () => {
      return typeof props.rowClassName === "function"
        ? props.rowClassName(row, rowIndex)
        : props.rowClassName;
    };
    const getDefaultClassName = () => {
      return {
        highlightCurrentRow: props.highlightCurrentRow,
        stripe: rowIndex % 2 !== 0 && props.stripe,
      };
    };
    return Object.assign(getDefaultClassName(), getCallBackClassName());
  };
});
const headerRowClass = computed(() => {
  return typeof props.headerRowClassName === "function"
    ? props.headerRowClassName()
    : props.headerRowClassName;
});
const headerCellStyle = computed(() => {
  return (prop, idx) => {
    // 默认样式
    const getDaultStyle = () => {
      const borderLeft = props.border ? normalBorder : "",
        borderTop = props.border ? normalBorder : "";
      const borderRight = props.border
        ? idx === columnsProps.length - 1
          ? normalBorder
          : ""
        : "";

      const borderBottom = normalBorder;
      const textAlign = "center";
      const color = "#909399";

      let lineHeight, padding, fontSize;

      switch (props.size) {
        case "big":
          lineHeight = "35px";
          padding = "8px";
          fontSize = "20px";
          break;
        case "normal":
          lineHeight = "30px";
          padding = "5px";
          fontSize = "18px";
          break;
        case "small":
          lineHeight = "25px";
          padding = "5px";
          fontSize = "16px";
          break;
        default:
          lineHeight = "25px";
          padding = "5px";
          fontSize = "16px";
      }

      return {
        borderLeft,
        borderTop,
        borderRight,
        borderBottom,
        padding,
        textAlign,
        lineHeight,
        fontSize,
        color,
      };
    };
    // 通过回调返回的样式
    const getCallBackStyle = () => {
      return typeof props.headerCellStyle === "function"
        ? props.headerCellStyle(prop, idx)
        : props.headerCellStyle;
    };
    // 优先级最高的样式(合并顺序最晚覆盖之前的样式)
    const getImportantStyle = () => {
      return {};
    };
    return Object.assign(
      getDaultStyle(),
      getCallBackStyle(),
      getImportantStyle()
    );
  };
});
const tableCellStyle = computed(() => {
  // 回调参数分别是 行数据 列数据(值) 行索引 列索引
  return (row, col, rowIndex, colIndex) => {
    // 默认样式
    const getDefaultStyle = () => {
      const borderLeft = props.border ? normalBorder : "";
      const borderRight = props.border
        ? colIndex === columnsProps.length - 1
          ? normalBorder
          : ""
        : "";

      const color = "#606266";
      const borderBottom = normalBorder;
      const textAlign = "center";

      let height, padding, fontSize;
      switch (props.size) {
        case "big":
          height = "30px";
          padding = "8px";
          fontSize = "16px";
          break;
        case "normal":
          height = "25px";
          padding = "6px";
          fontSize = "14px";
          break;
        case "small":
          height = "15px";
          padding = "4px";
          fontSize = "12px";
          break;
        default:
          height = "25px";
          padding = "6px";
          fontSize = "14px";
      }
      return {
        borderLeft,
        borderRight,
        borderBottom,
        padding,
        textAlign,
        height,
        fontSize,
        color,
      };
    };
    // 通过回调返回的样式
    const getCallBackStyle = () => {
      return typeof props.cellStyle === "function"
        ? props.cellStyle(row, col, rowIndex, colIndex)
        : props.cellStyle;
    };
    // 优先级最高的样式(合并顺序最晚覆盖之前的样式)
    const getImportantStyle = () => {
      // 最后一行取消底部border由bodywrapper的border代替(防止滚动下的重合)
      const borderBottom =
        rowIndex === props.data.length - 1 ? noBorder : normalBorder;
      const finalStyle = {
        borderBottom,
      };
      return props.data.length === 0
        ? Object.assign(finalStyle, { border: noBorder })
        : finalStyle;
    };
    return Object.assign(
      getDefaultStyle(),
      getCallBackStyle(),
      getImportantStyle()
    );
  };
});
const getLabel = computed(() => {
  return (row, colIndex) => {
    return row[columnsProps[colIndex]?.prop] === "" ||
      row[columnsProps[colIndex]?.prop] === undefined
      ? props.cellEmptyText
      : row[columnsProps[colIndex]?.prop];
  };
});

const filterPx = (str) => {
  return parseInt(str.replaceAll("px"));
};
// 自定义指令处理slot高度
const vResize = {
  mounted(el, binding) {
    // 这里使用debounce防抖处理，防抖的延时时间可以通过自定义指令的参数传过来，如`v-resize:300`表示300ms延时
    // 也可以将此处延时去掉，放在绑定的函数中自定义
    function debounce(fn, delay = 16) {
      let t = null;
      return function () {
        if (t) {
          clearTimeout(t);
        }
        const context = this;
        const args = arguments;
        t = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }
    el._resizer = new window.ResizeObserver(
      debounce(binding.value, Number(binding.arg) || 16)
    );
    el._resizer.observe(el);
  },
  unmounted(el) {
    el._resizer.disconnect();
  },
};
// 尺寸变化后的回调
const onResize = (arg) => {
  const height = arg[0].contentRect.height;
  const width = arg[0].contentRect.width;
  getColWidth();
};

const getColWidth = () => {
  // 获得table的实际宽度根据每列的width计算并分配宽度
  const tableWidth = window.getComputedStyle(proxy.$refs.tableBody).width;
  let availableWidth = filterPx(tableWidth);
  let count = 0;
  if (showScrollBar.value) availableWidth -= 17;
  // 第一次遍历为width赋值
  for (let idx in columnsProps) {
    const prop = columnsProps[idx];
    const width = prop.width;
    if (width !== -1) {
      availableWidth -= width;
      colWidthArr[idx] = width;
    } else count++;
  }
  // 第二次遍历为minWidth赋值
  let averageWidth = parseInt(availableWidth / count);
  for (let idx in columnsProps) {
    const prop = columnsProps[idx];
    const width = prop.width,
      minWidth = prop.minWidth;
    if (width !== -1) continue;
    if (averageWidth >= minWidth) {
      // 直接赋平均值
      colWidthArr[idx] = averageWidth;
      availableWidth -= averageWidth;
      count--;
      // 平均值不变
    } else {
      // 赋最小值
      if (availableWidth > minWidth) {
        colWidthArr[idx] = minWidth;
        availableWidth -= minWidth;
        count--;
        // 重新计算平均值
        averageWidth = parseInt(availableWidth / count);
      } else {
        // 将剩下的全部分配给该列
        colWidthArr[idx] = availableWidth;
        availableWidth = 0;
        averageWidth = 0;
        count--;
      }
    }

    // 分别给header和body的col赋值
    const bodyColgroup = proxy.$refs.bodyColgroup.children;
    const headerColgroup = proxy.$refs.headerColgroup?.children;

    bodyColgroup[
      idx
    ].__vueParentComponent.devtoolsRawSetupState.colWidth.value =
      colWidthArr[idx];
    if (headerColgroup)
      headerColgroup[
        idx
      ].__vueParentComponent.devtoolsRawSetupState.colWidth.value =
        colWidthArr[idx];
  }
};

onMounted(() => {
  const bodyColgroup = proxy.$refs.bodyColgroup.children;
  // 获取表头的属性
  for (let col of bodyColgroup)
    columnsProps.push(col.__vueParentComponent.props);

  // 判断是否出现溢出
  const table = proxy.$refs.table;
  showScrollBar.value = table.scrollHeight > table.clientHeight;

  // 更新列宽度
  getColWidth();

  nextTick(() => {
    // 溢出则计算高度显示滚动条
    if (showScrollBar.value) {
      let headerHeight;
      if (props.showHeader)
        headerHeight = window.getComputedStyle(proxy.$refs.tableHeader).height;
      else headerHeight = "0";
      const height = props.height !== -1 ? props.height : props.maxHeight;
      bodyHeight.value = height - 40 - filterPx(headerHeight);
    }
  });
});
</script>

<style scoped lang="less">
.table-container {
  padding: 20px;
  overflow: hidden;
  box-sizing: border-box;

  .body-wrapper {
    overflow: auto;
    box-sizing: border-box;
    border-bottom: 1px solid #ebebeb;

    .highlightCurrentRow {
      transition: background-color 0.25s ease;

      &:hover {
        background-color: rgb(236, 242, 244) !important;
      }
    }
  }

  .empty {
    width: 100%;
    height: 150px;
    border: 1px solid #ebeef5;
    border-top: 0px solid transparent;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: gray;
  }
}

.stripe {
  background-color: #eee;
}
</style>
