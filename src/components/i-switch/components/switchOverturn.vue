<template>
  <div class="toggle checkbox-overturn">
    <input class="tgl tgl-flip" :id="id" type="checkbox" checked v-model="inputValue" @change="handleChange" />
    <label class="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" :for="id" />
  </div>
</template>

<script setup name="switch-overturn">
const emits = defineEmits(['change'])

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true
  }
})

let inputValue = props.defaultValue;


const handleChange = e => {
  emits('change', inputValue)
}

const getRandomNodeId = () => {
  return 'overturn' + Date.now() + Math.ceil(Math.random() * 100000);
}

const id = getRandomNodeId()
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
    border: 2px solid #88cf8f;
    transition: .3s ease;
  }
}

.checkbox-overturn .tgl {
  display: none;
}

.checkbox-overturn .tgl,
.checkbox-overturn .tgl:after,
.checkbox-overturn .tgl:before,
.checkbox-overturn .tgl *,
.checkbox-overturn .tgl *:after,
.checkbox-overturn .tgl *:before,
.checkbox-overturn .tgl+.tgl-btn {
  box-sizing: border-box;
}

.checkbox-overturn .tgl::-moz-selection,
.checkbox-overturn .tgl:after::-moz-selection,
.checkbox-overturn .tgl:before::-moz-selection,
.checkbox-overturn .tgl *::-moz-selection,
.checkbox-overturn .tgl *:after::-moz-selection,
.checkbox-overturn .tgl *:before::-moz-selection,
.checkbox-overturn .tgl+.tgl-btn::-moz-selection,
.checkbox-overturn .tgl::selection,
.checkbox-overturn .tgl:after::selection,
.checkbox-overturn .tgl:before::selection,
.checkbox-overturn .tgl *::selection,
.checkbox-overturn .tgl *:after::selection,
.checkbox-overturn .tgl *:before::selection,
.checkbox-overturn .tgl+.tgl-btn::selection {
  background: none;
}

.checkbox-overturn .tgl+.tgl-btn {
  outline: 0;
  display: inline-block;
  width: 111px;
  height: 48px;
  position: relative;
  cursor: pointer;
  user-select: none;
}

.checkbox-overturn .tgl+.tgl-btn:after,
.checkbox-overturn .tgl+.tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 50%;
  height: 100%;
}

.checkbox-overturn .tgl+.tgl-btn:after {
  left: 0;
}

.checkbox-overturn .tgl+.tgl-btn:before {
  display: none;
}

.checkbox-overturn .tgl:checked+.tgl-btn:after {
  left: 50%;
}

.checkbox-overturn .tgl-flip+.tgl-btn {
  padding: 2px;
  transition: all 0.2s ease;
  font-family: sans-serif;
  perspective: 100px;
  font-size: 22px;
}

.checkbox-overturn .tgl-flip+.tgl-btn:after,
.checkbox-overturn .tgl-flip+.tgl-btn:before {
  display: inline-block;
  transition: all 0.4s ease;
  width: 100%;
  text-align: center;
  position: absolute;
  line-height: 2em;
  font-weight: bold;
  color: #fff;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  border-radius: 4px;
}

.checkbox-overturn .tgl-flip+.tgl-btn:after {
  content: attr(data-tg-on);
  background: #02C66F;
  transform: rotateY(-180deg);
}

.checkbox-overturn .tgl-flip+.tgl-btn:before {
  background: #FF3A19;
  content: attr(data-tg-off);
}

.checkbox-overturn .tgl-flip+.tgl-btn:active:before {
  transform: rotateY(-20deg);
}

.checkbox-overturn .tgl-flip:checked+.tgl-btn:before {
  transform: rotateY(180deg);
}

.checkbox-overturn .tgl-flip:checked+.tgl-btn:after {
  transform: rotateY(0);
  left: 0;
  background: #7FC6A6;
}

.checkbox-overturn .tgl-flip:checked+.tgl-btn:active:after {
  transform: rotateY(20deg);
}
</style>
