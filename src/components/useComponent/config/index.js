import carouelConfig from "./i-carousel";
import tableConfig from "./i-table";
import tooltipConfig from "./i-tooltip";
import mindConfig from "./i-mind";
import switchConfig from "./i-switch";
import messageConfig from "./i-message";
import sidebarConfig from "./i-side-bar";
import transitionConfig from "./i-transition";
import buttonConfig from "./i-button";
import selectConfig from "./i-select";
import colorConfig from "./i-color";
import lotteryConfig from "./i-lottery";

const arr = [
  lotteryConfig,
  colorConfig,
  transitionConfig,
  mindConfig,
  sidebarConfig,
  carouelConfig,
  tableConfig,
  switchConfig,
  tooltipConfig,
  buttonConfig,
  selectConfig,
  messageConfig,
];

const sideBarConfig = arr.map((x) => {
  return {
    label: x.title.text,
    children: x.children.map((child) => {
      return {
        label: child.title.text,
        id: child.id,
        defaultChecked: child.defaultChecked,
      };
    }),
    defaultChecked: x.defaultChecked,
    defaultUnfold: x.defaultUnfold,
  };
});

export default sideBarConfig;
