<template>
  <use-component :title="config.title" :lists="config.lists">
    <transition-group name="translate-right-down">
      <show-component v-for="component in selectedArr" :key="getProp(component, 'title')"
        :code="getProp(component, 'code')" :title="getProp(component, 'title')" :refresh="refreshTooltip">
        <component :is="component" :refreshTooltip="refreshTooltip" />
      </show-component>
    </transition-group>
  </use-component>
</template>

<script setup name="use-component-router">
import { watch, ref } from "vue";

import tableConfig from "../config/i-table";
import carouselConfig from "../config/i-carousel";
import tooltipConfig from "../config/i-tooltip";
import mindConfig from "../config/i-mind";
import switchConfig from "../config/i-switch";
import messageConfig from "../config/i-message";
import sideBarConfig from "../config/i-side-bar";
import transitionConfig from "../config/i-transition";
import buttonConfig from "../config/i-button";
import selectConfig from "../config/i-select";
import colorConfig from "../config/i-color";
import lotteryConfig from '../config/i-lottery'

const props = defineProps({
  selectedArr: {
    type: Array,
    default() {
      return [];
    },
  },
  componentName: {
    type: String,
    default: "",
  },
  scrollOffset: {
    type: Number,
    default: 0,
  },
});

const getConfig = () => {
  switch (props.componentName) {
    case "use-i-table":
      return tableConfig;
    case "use-i-tooltip":
      return tooltipConfig;
    case "use-i-carousel":
      return carouselConfig;
    case "use-i-mind":
      return mindConfig;
    case "use-i-switch":
      return switchConfig;
    case "use-i-message":
      return messageConfig;
    case "use-i-side-bar":
      return sideBarConfig;
    case "use-i-transition":
      return transitionConfig;
    case "use-i-button":
      return buttonConfig;
    case "use-i-select":
      return selectConfig;
    case "use-i-color":
      return colorConfig;
    case 'use-i-lottery':
      return lotteryConfig;
  }
};

let refreshTooltip = ref(false);

const config = getConfig();

const getProp = (name, arg) => {
  return config.children.find((x) => {
    return x.id === name;
  })[arg];
};

watch(
  () => props.scrollOffset,
  (newValue, oldValue) => {
    refreshTooltip.value = !refreshTooltip.value;
  }
);
</script>
