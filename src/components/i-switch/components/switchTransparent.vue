<template>
  <div class="toggle transparent">
    <input :id="id" type="checkbox" v-model="inputValue" @change="handleChange" />
    <label class="toggle-item" :for="id" />
  </div>
</template>

<script setup name="switch-transparent">
const emits = defineEmits(['change'])

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true
  }
})

let inputValue = props.defaultValue;

const getRandomNodeId = () => {
  return 'transparent' + Date.now() + Math.ceil(Math.random() * 100000);
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
    transition: .3s ease;
  }
}

.transparent {

  // background-color: #2e394d;
  label {
    background: transparent;
    border: 3px solid #fff;
    height: 48px;

    &::before {
      border: 3px solid #fff;
      width: 30px;
      height: 30px;
      top: 3px;
      left: 4px;
      background: #fff;
    }
  }
}

.toggle input:checked+label {
  &::before {
    transform: translateX(60px);
  }
}
</style>
