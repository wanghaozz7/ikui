<template>
  <div class="toggle basketball-hoop">
    <input :id="id" type="checkbox" v-model="inputValue" @change="handleChange" />
    <label class="toggle-item" :for="id">
      <div class="ball__wrapper">
        <div class="ball" />
      </div>
      <div class="hoop" />
    </label>
  </div>
</template>

<script setup name="switch-basketball">
const emits = defineEmits(['change'])

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true
  },
  activeColor: {
    type: String,
    default: '#FF9800'
  },
  inactiveColor: {
    type: String,
    default: '#542583'
  }
})

let inputValue = props.defaultValue;

const getRandomNodeId = () => {
  return 'basketball' + Date.now() + Math.ceil(Math.random() * 100000);
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
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
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


/*--------*/
.basketball-hoop {
  padding-top: 150px;

  label {
    background: #fdb827;
  }

  label:before {
    content: none;
  }

  .ball {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    position: absolute;
    background: #FF9800;
    border: 2px solid black;
    transition: .4s ease;
    top: 4px;
    left: 4px;
    background-image: radial-gradient(circle at -5px 10px, transparent 15px, black 15px, black 17px, transparent 17px), radial-gradient(circle at 41px 25px, transparent 15px, black 15px, black 17px, transparent 17px), linear-gradient(110deg, transparent 22px, black 22px, black 24px, transparent 24px), linear-gradient(18deg, transparent 22px, black 22px, black 24px, transparent 24px);

    &__wrapper {
      transition: .4s ease;
      width: 195%;
      height: 200%;
      transform-origin: 50% -2%;
    }
  }

  .hoop {
    top: -50px;
    right: -84px;
    width: 50px;
    background: #f44336;
    height: 8px;
    position: absolute;

    &:before {
      position: absolute;
      right: -4px;
      width: 7px;
      height: 60px;
      background: #cd2e22;
      top: -40px;
    }

    &:after {
      width: 40px;
      height: 35px;
      background: repeating-linear-gradient(45deg, transparent, transparent 13px, white 13px, white 15px), repeating-linear-gradient(-45deg, transparent, transparent 13px, white 13px, white 15px);
      top: 8px;
      border-radius: 0 0 20% 20%/40% 40% 60% 60%;
      border: 2px solid #fff;
      border-width: 0 2px;
      left: 2px;
      z-index: 20;
    }
  }
}

.toggle input:checked+label {
  background: #542583;
  transition-delay: 1.35s;

  .ball__wrapper {
    animation: 1.5s linear ball-wrapper forwards;
  }

  .ball {
    animation: 1.5s linear ball forwards;
  }
}

@keyframes ball {
  0% {
    transform: none;
  }

  40% {
    transform: rotate(-150deg)
  }

  48% {
    transform: rotate(-150deg) translateY(92px)
  }

  52% {
    transform: rotate(-150deg) translate(-10px, 80px)
  }

  56% {
    transform: rotate(-150deg) translate(-25px, 91px)
  }

  60% {
    transform: rotate(-150deg) translate(-35px, 86px)
  }

  65% {
    transform: rotate(-150deg) translate(-45px, 91px)
  }

  70% {
    transform: rotate(-150deg) translate(-50px, 87px)
  }

  75% {
    transform: rotate(-150deg) translate(-60px, 91px)
  }

  80% {
    transform: rotate(-150deg) translate(-65px, 88px)
  }

  85% {
    transform: rotate(-150deg) translate(-70px, 91px)
  }

  90% {
    transform: rotate(-150deg) translate(-75px, 90px)
  }

  95% {
    transform: rotate(-150deg) translate(-80px, 90px)
  }

  100% {
    transform: rotate(-150deg) translate(-82px, 91px)
  }
}

@keyframes ball-wrapper {
  0% {
    transform: none;
  }

  40%,
  100% {
    transform: rotate(150deg);
  }
}
</style>
