<template>
  <div class="toggle checkbox-ripple">
    <input type="checkbox" :id="id" v-model="inputValue" @change="handleChange" />
    <label :for="id" class="label">
      <span />
    </label>
  </div>
</template>

<script setup name="switch-ripple">
const emits = defineEmits(['change'])

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true
  }
})

let inputValue = props.defaultValue;

const getRandomNodeId = () => {
  return 'ripple' + Date.now() + Math.ceil(Math.random() * 100000);
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
  // background-color: #bcdd96;

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
  // background: #2e394d;
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

.checkbox-ripple input[type="checkbox"] {
  visibility: hidden;
  display: none;
}


.checkbox-ripple .label {
  position: relative;
  display: inline-block;
  width: 111px;
  height: 48px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transform: translate3d(0, 0, 0);
}

.checkbox-ripple .label:before {
  content: "";
  position: relative;
  top: 3px;
  width: 111px;
  height: 40px;
  display: block;
  background: #9A9999;
  border-radius: 60px;
  transition: background 0.2s ease;
}


.checkbox-ripple .label span {
  position: absolute;
  top: 0;
  left: 0;
  width: 47px;
  height: 47px;
  display: block;
  background: white;
  border-radius: 30px;
  box-shadow: 0 3px 8px rgba(154, 153, 153, 0.5);
  transition: all 0.2s ease;
}

.checkbox-ripple .label span:before {
  content: "";
  position: absolute;
  display: block;
  margin: -18px;
  width: 80px;
  height: 80px;
  background: rgba(79, 46, 220, 0.5);
  border-radius: 50%;
  transform: scale(0);
  opacity: 1;
  pointer-events: none;
}

.toggle input:checked+.label:before {
  background: #947ADA;
}

.toggle input:checked+.label span {
  background: #4F2EDC;
  transform: translateX(70px);
  transition: all 0.2s cubic-bezier(0.8, 0.4, 0.3, 1.25), background 0.15s ease;
  box-shadow: 0 3px 8px rgba(79, 46, 220, 0.2);
}

.toggle input:checked+.label span:before {
  transform: scale(1);
  opacity: 0;
  transition: all 0.4s ease;
}
</style>
