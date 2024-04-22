<template>
  <div class="toggle checkcross">
    <input :id="id" type="checkbox" v-model="inputValue" @change="handleChange" />
    <label class="toggle-item" :for="id">
      <div class="check" />
    </label>
  </div>
</template>

<script setup name="switch-roll">
const emits = defineEmits(['change'])

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true
  }
})

let inputValue = props.defaultValue;

const getRandomNodeId = () => {
  return 'roll' + Date.now() + Math.ceil(Math.random() * 100000);
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
    border: 2px solid #88cf8f;
    transition: .3s ease;
  }
}


.checkcross {

  // background-color: cornflowerblue;
  label:before {
    content: none;
  }

  .check {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: absolute;
    background: #8BC34A;
    transition: .4s ease;
    top: 4px;
    left: 4px;

    &::before,
    &::after {
      height: 4px;
      border-radius: 10px;
      left: 0;
      background: #fff;
      transition: .4s ease;
    }

    &::before {
      width: 25px;
      transform: rotate(-45deg) translate(-6px, 20px);
    }

    &::after {
      width: 10px;
      transform: rotate(45deg) translate(20px, 11px);
    }
  }
}

.toggle input:checked+label {
  .check {
    left: 68px;
    transform: rotate(360deg);
    background: #c34a4a;

    &:before {
      width: 27px;
      transform: rotate(-45deg) translate(-8px, 18px);
    }

    &:after {
      width: 27px;
      transform: rotate(45deg) translate(18px, 8px);
    }
  }
}
</style>
