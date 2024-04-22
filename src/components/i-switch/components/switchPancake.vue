<template>
  <div class="toggle pancake-stack">
    <input :id="id" type="checkbox" v-model="inputValue" @change="handleChange" />
    <label class="toggle-item" :for="id">
      <div class="pancakes">
        <div class="pancake" />
        <div class="pancake" />
        <div class="pancake" />
        <div class="butter" />
      </div>
    </label>
  </div>
</template>

<script setup name="switch-pancake">
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
  return 'pancake' + Date.now() + Math.ceil(Math.random() * 100000);
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

.pancake-stack {
  label:before {
    content: none;
  }

  .pancakes {
    transition: .6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .pancake {
    background: #e27c31;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: absolute;
    transition: .4s ease;
    top: 2px;
    left: 4px;
    box-shadow: 0 2px 0 2px #fbbe7c;

    &:nth-child(2) {
      left: 0;
      top: -3px;
      transform: scale(0);
      transition: .2s ease .2s;
    }

    &:nth-child(3) {
      top: -8px;
      transform: scale(0);
      transition: .2s ease .2s;

      &:before,
      &:after {
        background: #ef8927;
        border-radius: 20px;
        width: 50%;
        height: 20%;
      }

      &:before {
        top: 20px;
        left: 5px;
      }

      &:after {
        top: 22px;
        right: 5px;
      }
    }
  }

  .butter {
    width: 12px;
    height: 11px;
    background: #fbdb60;
    top: 6px;
    left: 20px;
    position: absolute;
    border-radius: 4px;
    box-shadow: 0 1px 0 1px #d67823;
    transform: scale(0);
    transition: .2s ease;
  }
}

.toggle input:checked {
  +label {
    .pancakes {
      transform: translateX(70px);
    }

    .pancake {
      &:nth-child(2) {
        transform: scale(1);
        transition-delay: .2s;
      }

      &:nth-child(3) {
        transform: scale(1);
        transition-delay: .4s;
      }
    }

    .butter {
      transform: scale(1);
      transition-delay: .6s;
    }
  }
}
</style>
