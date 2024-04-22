<template>
  <div class="homeViewContainer" :style="getContainerStyle">
    <div class="sideBar">
      <i-scroll-bar showScrollBar="hover">
        <i-side-bar :sideBarData="sideBarData" :defaultCheckedAll="false" :rowHeight="40" defaultUnfoldAll showCheckBox
          @nodeCheckedChange="handleNodeCheckedChange" />
      </i-scroll-bar>
    </div>
    <div class="mainContent">
      <i-scroll-bar showScrollBar="hover" @offsetChange="handleOffsetChange">
        <div class="views">
          <transition-group name="translate-right-down" appear>
            <use-component-router v-for="component in componentStack" :key="component" :selectedArr="component.arr"
              :scrollOffset="scrollOffset" :componentName="component.name" />
          </transition-group>
        </div>
      </i-scroll-bar>
    </div>
  </div>
  <!-- <div class="mode">
    <i-switch type="weather" v-model="mode" />
  </div> -->
</template>

<script setup name="HomeView">
import { reactive, ref, computed } from "vue";

import sideBarConfig from "@/components/useComponent/config/index.js";

const componentStack = reactive([]);
let scrollOffset = ref(0);
let mode = ref(false);
const sideBarData = sideBarConfig.slice();

const handleOffsetChange = (offset) => (scrollOffset.value = offset);

const handleNodeCheckedChange = (node, type) => {
  const component = node.id.slice(0, node.id.lastIndexOf("-"));
  let idx = componentStack.indexOf(
    componentStack.find((x) => {
      return x.name === component;
    })
  );

  if (type === "add") {
    if (idx === -1) {
      componentStack.unshift({
        name: component,
        arr: new Array(),
      });
      idx = 0;
    }
    componentStack[idx].arr.unshift(node.id);
    // 添加后最新的内容在上面
    [componentStack[idx], componentStack[0]] = [
      componentStack[0],
      componentStack[idx],
    ];
  } else {
    const arr = componentStack[idx].arr;
    let index = arr.indexOf(node.id);
    arr.splice(index, 1);
    if (arr.length === 0) componentStack.splice(idx, 1);
  }
};

const getContainerStyle = computed(() => {
  const backgroundColor = mode.value ? "gray" : "";
  const color = mode.value ? 'white' : '';
  return {
    // backgroundColor,
    // color
  };
});
</script>

<style scoped lang="less">
.homeViewContainer {
  width: 1426px;
  margin: auto;
  display: flex;

  .sideBar {
    width: 290px;
    height: auto;
  }

  .mainContent {
    flex: 1;

    .views {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}

.mode {
  position: fixed;
  right: 20px;
  top: 20px;
}
</style>
