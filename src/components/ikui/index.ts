// @ts-ignore
import iButton from '../i-button/i-button.vue'
// @ts-ignore
import iCard from "../i-card/i-card.vue";
// @ts-ignore
import iCarousel from "../i-carousel/i-carousel.vue";
// @ts-ignore
import iColorBox from "../i-color-box/i-color-box.vue";
// @ts-ignore
import iLottery from "../i-lottery/i-lottery.vue";
// @ts-ignore
import iMind from "../i-mind/i-mind.vue";
// @ts-ignore
import iScrollBar from "../i-scroll-bar/i-scroll-bar.vue";
// @ts-ignore
import iSelect from "../i-select/i-select.vue";
// @ts-ignore
import iSideBar from "../i-side-bar/i-side-bar.vue";
// @ts-ignore
import iSwitch from "../i-switch/i-switch.vue";
// @ts-ignore
import iTable from "../i-table/i-table.vue";
// @ts-ignore
import iTooltip from "../i-tooltip/i-tooltip.vue";

export {
  iButton,
  iCard,
  iCarousel,
  iColorBox,
  iLottery,
  iMind,
  iScrollBar,
  iSelect,
  iSideBar,
  iSwitch,
  iTooltip,
  iTable,
};

const component = [
  iButton,
  iCard,
  iCarousel,
  iColorBox,
  iLottery,
  iMind,
  iScrollBar,
  iSelect,
  iSideBar,
  iSwitch,
  iTooltip,
  iTable,
];

const ikui = {
  install(App: any) {
    component.forEach((item: any) => {
      App.component(item.name, iButton);
    });
  },
};

export default ikui;
