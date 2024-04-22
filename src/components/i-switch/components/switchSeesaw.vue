<template>
  <div class="toggle checkbox-seesaw">
    <label class="rocker rocker-small">
      <input type="checkbox" v-model="inputValue" @change="handleChange">
      <span class="switch-left">Yes</span>
      <span class="switch-right">No</span>
    </label>
  </div>
</template>

<script setup name="switch-seesaw">
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

.checkbox-seesaw {
  padding: 5px 0 !important;
}

.checkbox-seesaw input[type="checkbox"] {
  visibility: hidden;
  display: none;
}

.checkbox-seesaw *,
.checkbox-seesaw ::after,
.checkbox-seesaw ::before {
  box-sizing: border-box;
}

.checkbox-seesaw .rocker {
  display: inline-block;
  position: relative;
  /*
    SIZE OF SWITCH
    ==============
    All sizes are in em - therefore
    changing the font-size here
    will change the size of the switch.
    See .rocker-small below as example.
    */
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: #888;
  width: 111px;
  height: 63px;
  overflow: hidden;
  border-bottom: 0.5em solid #eee;
}

.checkbox-seesaw .rocker-small {
  /* font-size: 75em; */
}

.checkbox-seesaw .rocker::before {
  content: "";
  position: absolute;
  top: 0.5em;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  border: 0.5em solid #eee;
  border-bottom: 0;
}

.checkbox-seesaw .switch-left,
.checkbox-seesaw .switch-right {
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5em;
  width: 3em;
  transition: 0.2s;
  user-select: none;
}

.checkbox-seesaw .switch-left {
  height: 2.4em;
  width: 2.75em;
  left: 0.85em;
  bottom: 0.4em;
  background-color: #ddd;
  transform: rotate(15deg) skewX(15deg);
}

.checkbox-seesaw .switch-right {
  right: 0.5em;
  bottom: 0;
  background-color: #bd5757;
  color: #fff;
}

.checkbox-seesaw .switch-left::before,
.checkbox-seesaw .switch-right::before {
  content: "";
  position: absolute;
  width: 0.4em;
  height: 2.45em;
  bottom: -0.45em;
  background-color: #ccc;
  transform: skewY(-65deg);
}

.checkbox-seesaw .switch-left::before {
  left: -0.4em;
}

.checkbox-seesaw .switch-right::before {
  right: -0.375em;
  background-color: transparent;
  transform: skewY(65deg);
}

.checkbox-seesaw input:checked+.switch-left {
  background-color: #0084d0;
  color: #fff;
  bottom: 0px;
  left: 0.5em;
  height: 2.5em;
  width: 3em;
  transform: rotate(0deg) skewX(0deg);
}

.checkbox-seesaw input:checked+.switch-left::before {
  background-color: transparent;
  width: 3.0833em;
}

.checkbox-seesaw input:checked+.switch-left+.switch-right {
  background-color: #ddd;
  color: #888;
  bottom: 0.4em;
  right: 0.8em;
  height: 2.4em;
  width: 2.75em;
  transform: rotate(-15deg) skewX(-15deg);
}

.checkbox-seesaw input:checked+.switch-left+.switch-right::before {
  background-color: #ccc;
}

/* Keyboard Users */
.checkbox-seesaw input:focus+.switch-left {
  color: #333;
}

.checkbox-seesaw input:checked:focus+.switch-left {
  color: #fff;
}

.checkbox-seesaw input:focus+.switch-left+.switch-right {
  color: #fff;
}

.checkbox-seesaw input:checked:focus+.switch-left+.switch-right {
  color: #333;
}
</style>
