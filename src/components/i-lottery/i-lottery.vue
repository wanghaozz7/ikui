<template>
  <div id="lottery" :class="move">
    <i-sector v-for="(sector, idx) in group" :coordinate="sector.coordinate" :title="sector.title" :bgc="sector.bgc"
      :translate="translates[idx]" :beforeAngle="getBeforeAngle(idx)" class="sector" />
    <i-pointer class="pointer" @click="handleClick" :class="move" :style="getRandomAngle" />
  </div>
</template>
<script setup>
import { ref, computed, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
  group: {
    type: Array,
    default() {
      return []
    }
  },
  delay: {
    type: Number,
    default: 3000
  },
  turn: {
    type: Number,
    default: 5
  }
})

const emits = defineEmits([
  "rollStart",
  "rollEnd"
]);

const total = props.group.reduce((pre, next) => {
  return pre += next.weight
}, 0);

let lastAngle = 0;
let lastCor = '0 0';
let translates = [];
let move = ref('')
let angle = ref(0);

// 为每个扇形分配角度和坐标
for (let sector of props.group) {
  let angle = 360 * sector.weight / total;// 根据份额分配角度
  let translate = [];
  const polygon = [lastCor] // 起始坐标是上一个sector的最后一个坐标
  //每次最多+90度
  while (angle > 90) {
    angle -= 90;
    if (lastAngle < 90) polygon.push('100% 0');
    else if (lastAngle < 180) polygon.push('100% 100%');
    else if (lastAngle < 270) polygon.push('0 100%');
    lastAngle += 90;
  }
  if (lastAngle % 90 + angle >= 90) {
    if (lastAngle < 90) polygon.push('100% 0');
    else if (lastAngle < 180) polygon.push('100% 100%');
    else if (lastAngle < 270) polygon.push('0 100%');
  }
  lastAngle += angle;
  const edge = Math.floor(lastAngle / 90);
  const pos = lastAngle % 90;
  if (edge === 0) polygon.push(`${pos / 0.9}% 0`);
  else if (edge === 1) polygon.push(`100% ${pos / 0.9}%`);
  else if (edge === 2) polygon.push(`${100 - pos / 0.9}% 100%`);
  else if (edge === 3) polygon.push(`0 ${100 - pos / 0.9}%`);
  else if (edge === 4) polygon.push('0 0')
  lastCor = polygon[polygon.length - 1]
  const start = polygon[0].split(' ');
  const end = lastCor.split(' ');
  start[0] = start[0].replaceAll('%', '');
  start[1] = start[1].replaceAll('%', '');
  end[0] = end[0].replaceAll('%', '');
  end[1] = end[1].replaceAll('%', '');
  translate[0] = (Number(start[0]) + Number(end[0])) / 2;
  translate[1] = (Number(start[1]) + Number(end[1])) / 2;
  translates.push(translate)
  polygon.push('50% 50%');
  const str = `polygon(${polygon.join(',')})`;
  sector.coordinate = str;
}

const handleClick = e => {
  if (move.value === '') {
    move.value = 'move'
    angle.value = props.turn * 360 + Math.random() * (0 - 360) + 360;
    let num = (angle.value + 45) % 360;
    for (let sector of props.group) {
      num -= sector.weight * 360 / total;
      if (num <= 0) {
        emits('rollStart', sector)
        setTimeout(() => {
          proxy.$message({
            info: `${sector.title}中奖了`,
          });
          emits('rollEnd', sector)
        }, props.delay + 500);
        break
      }
    }

  }
  else move.value = '' // 指针重置回原点
}

const getBeforeAngle = idx => {
  let res = 0;
  for (let i = 0; i < idx; i++) {
    res += props.group[i].weight;
  }
  return res * 360 / total;
}

// 指针随机旋转
const getRandomAngle = computed(() => {
  return {
    "--angle": `rotate(${angle.value}deg)`,
    '--delay': `all ease-in-out ${props.delay / 1000}s 0.2s`
  }
}
)
</script>
<style lang="less" scoped>
#lottery {
  width: 500px;
  height: 500px;
  border-radius: 50%;
  position: relative;

  .sector {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .pointer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    z-index: 999;
  }

  .move {
    transform: var(--angle);
    transition: var(--delay);
  }
}
</style>