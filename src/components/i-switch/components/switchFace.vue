<template>
  <div class="toggle checkbox-face">
    <div class="check">
      <input :id="id" type="checkbox" v-model="inputValue" @change="handleChange">
      <label :for="id" />
    </div>
  </div>
</template>

<script setup name="switch-face">
const emits = defineEmits(['change'])

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true
  }
})

const getRandomNodeId = () => {
  return 'face' + Date.now() + Math.ceil(Math.random() * 100000);
}

const id = getRandomNodeId()

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

.checkbox-face .check {
  --size: 50px;

  position: relative;
  background: linear-gradient(90deg, #f19af3, #f099b5);
  line-height: 0;
  perspective: 400px;
  font-size: var(--size);
}

.checkbox-face .check input[type="checkbox"],
.checkbox-face .check label,
.checkbox-face .check label::before,
.checkbox-face .check label::after,
.checkbox-face .check {
  appearance: none;
  display: inline-block;
  border-radius: var(--size);
  border: 0;
  transition: .35s ease-in-out;
  box-sizing: border-box;
  cursor: pointer;
}

.checkbox-face .check label {
  width: calc(2.2 * var(--size));
  height: var(--size);
  background: #d7d7d7;
  overflow: hidden;
}

.checkbox-face .check input[type="checkbox"] {
  position: absolute;
  opacity: 1;
  z-index: 1;
  width: calc(.8 * var(--size));
  height: calc(.8 * var(--size));
  top: calc(.1 * var(--size));
  left: calc(.1 * var(--size));
  background: linear-gradient(45deg, #dedede, #ffffff);
  box-shadow: 0 6px 7px rgba(0, 0, 0, 0.3);
  outline: none;
  margin: 0;
}

.checkbox-face .check input[type="checkbox"]:checked {
  left: calc(1.3 * var(--size));
}

.checkbox-face .check input[type="checkbox"]:checked+label {
  background: transparent;
}

.checkbox-face .check label::before,
.checkbox-face .check label::after {
  content: "· ·";
  position: absolute;
  overflow: hidden;
  left: calc(.15 * var(--size));
  top: calc(.5 * var(--size));
  height: var(--size);
  letter-spacing: calc(-0.04 * var(--size));
  color: #9b9b9b;
  font-family: "Times New Roman", serif;
  z-index: 2;
  font-size: calc(.6 * var(--size));
  border-radius: 0;
  transform-origin: 0 0 calc(-0.5 * var(--size));
  backface-visibility: hidden;
}

.checkbox-face .check label::after {
  content: "●";
  top: calc(.65 * var(--size));
  left: calc(.2 * var(--size));
  height: calc(.1 * var(--size));
  width: calc(.35 * var(--size));
  font-size: calc(.2 * var(--size));
  transform-origin: 0 0 calc(-0.4 * var(--size));
}

.checkbox-face .check input[type="checkbox"]:checked+label::before,
.checkbox-face .check input[type="checkbox"]:checked+label::after {
  left: calc(1.55 * var(--size));
  top: calc(.4 * var(--size));
  line-height: calc(.1 * var(--size));
  transform: rotateY(360deg);
}

.checkbox-face .check input[type="checkbox"]:checked+label::after {
  height: calc(.16 * var(--size));
  top: calc(.55 * var(--size));
  left: calc(1.6 * var(--size));
  font-size: calc(.6 * var(--size));
  line-height: 0;
}
</style>
