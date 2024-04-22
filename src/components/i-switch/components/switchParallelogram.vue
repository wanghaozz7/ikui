<template>
  <div class="toggle checkbox-parallelogram" :style="{ '--activeColor': activeColor, '--inactiveColor': inactiveColor }">
    <input class="tgl tgl-skewed" :id="id" type="checkbox" v-model="inputValue" @change="handleChange" />
    <label class="tgl-btn" data-tg-off="OFF" data-tg-on="ON" :for="id" />
  </div>
</template>

<script setup name="switch-parallelogram">
const emits = defineEmits(['change'])

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true
  },
  activeColor: {
    type: String,
    default: '#2e394d'
  },
  inactiveColor: {
    type: String,
    default: 'orange'
  },
})

let inputValue = props.defaultValue;

const getRandomNodeId = () => {
  return 'parallelogram' + Date.now() + Math.ceil(Math.random() * 100000);
}

const id = getRandomNodeId()


const handleChange = e => {
  emits('change', inputValue)
}
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;

  &::before,
  &::after {
    content: '';
    position: absolute;
  }
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bcdd96;

  @media (max-width: 600px) {

    .toggle {
      border-right: none !important;
      border-bottom: 1px solid #f5f5f5;
    }

    >div>div {
      &:nth-child(odd) {
        border-right: none !important;
      }
    }

  }

  >div {
    width: 604px;
    border: 1px solid #f5f5f5;
    flex-wrap: wrap;
    text-align: center;
    font-size: 0;

    >div {
      width: 300px;
      display: inline-block;
      padding: 20px 0;

      &:not(:last-child) {
        &:nth-child(odd) {
          border-right: 1px solid #f5f5f5;
        }
      }

      input {
        height: 40px;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 40px;
      }
    }
  }
}

.toggle {
  position: relative;
  display: inline-block;
}

label.toggle-item {
  width: 111px;
  background: #2e394d;
  height: 48px;
  display: inline-block;
  border-radius: 50px;
  position: relative;
  transition: all .3s ease;
  transform-origin: 20% center;
  cursor: pointer;

  &::before {
    display: block;
    width: 40px;
    height: 40px;
    top: 3px;
    left: 4px;
    border-radius: 50%;
    // border: 2px solid #88cf8f;
    transition: .3s ease;
  }
}

.checkbox-parallelogram .tgl {
  display: none;
}

.checkbox-parallelogram .tgl,
.checkbox-parallelogram .tgl:after,
.checkbox-parallelogram .tgl:before,
.checkbox-parallelogram .tgl *,
.checkbox-parallelogram .tgl *:after,
.checkbox-parallelogram .tgl *:before,
.checkbox-parallelogram .tgl+.tgl-btn {
  box-sizing: border-box;
}

.checkbox-parallelogram .tgl::-moz-selection,
.checkbox-parallelogram .tgl:after::-moz-selection,
.checkbox-parallelogram .tgl:before::-moz-selection,
.checkbox-parallelogram .tgl *::-moz-selection,
.checkbox-parallelogram .tgl *:after::-moz-selection,
.checkbox-parallelogram .tgl *:before::-moz-selection,
.checkbox-parallelogram .tgl+.tgl-btn::-moz-selection,
.checkbox-parallelogram .tgl::selection,
.checkbox-parallelogram .tgl:after::selection,
.checkbox-parallelogram .tgl:before::selection,
.checkbox-parallelogram .tgl *::selection,
.checkbox-parallelogram .tgl *:after::selection,
.checkbox-parallelogram .tgl *:before::selection,
.checkbox-parallelogram .tgl+.tgl-btn::selection {
  background: none;
}

.checkbox-parallelogram .tgl+.tgl-btn {
  outline: 0;
  display: inline-block;
  width: 100px;
  height: 44px;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox-parallelogram .tgl+.tgl-btn:after,
.checkbox-parallelogram .tgl+.tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 50%;
  height: 100%;
  font-size: 20px;
}

.checkbox-parallelogram .tgl+.tgl-btn:after {
  left: 0;
}

.checkbox-parallelogram .tgl+.tgl-btn:before {
  display: none;
}

.checkbox-parallelogram .tgl:checked+.tgl-btn:after {
  left: 50%;
}

.checkbox-parallelogram .tgl-skewed+.tgl-btn {
  overflow: hidden;
  transform: skew(-45deg);
  // -webkit-backface-visibility: hidden;
  // backface-visibility: hidden;
  transition: all 0.2s ease;
  font-family: sans-serif;
  background: #888;
  border: 0px solid transparent;
}

.checkbox-parallelogram .tgl-skewed+.tgl-btn:after,
.checkbox-parallelogram .tgl-skewed+.tgl-btn:before {
  transform: skew(45deg);
  display: inline-block;
  transition: all 0.2s ease;
  width: 100%;
  text-align: center;
  position: absolute;
  line-height: 48px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}

.checkbox-parallelogram .tgl-skewed+.tgl-btn:after {
  left: 100%;
  content: attr(data-tg-on);
}

.checkbox-parallelogram .tgl-skewed+.tgl-btn:before {
  left: 0;
  content: attr(data-tg-off);
}

.checkbox-parallelogram .tgl-skewed+.tgl-btn:active {
  background: var(--activeColor);
}

.checkbox-parallelogram .tgl-skewed+.tgl-btn:active:before {
  left: -10%;
}

.checkbox-parallelogram .tgl-skewed:checked+.tgl-btn {
  background: var(--inactiveColor);
}

.checkbox-parallelogram .tgl-skewed:checked+.tgl-btn:before {
  left: -100%;
}

.checkbox-parallelogram .tgl-skewed:checked+.tgl-btn:after {
  left: 0;
}

.checkbox-parallelogram .tgl-skewed:checked+.tgl-btn:active:after {
  left: 10%;
}
</style>
