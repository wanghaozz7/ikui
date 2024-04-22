<template>
  <div class="toggle checkbox-weather">
    <label class="switch">
      <input type="checkbox" v-model="inputValue" @change="handleChange" />
      <span class="slider" />
    </label>
  </div>
</template>

<script setup name="switch-weather">
const emits = defineEmits(["change"]);

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true,
  },
});

let inputValue = props.defaultValue;

const handleChange = (e) => {
  emits("change", inputValue);
};


</script>

<style scoped lang="less">
* {
  box-sizing: border-box;

  &::before,
  &::after {
    content: "";
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

    > div > div {
      &:nth-child(odd) {
        border-right: none !important;
      }
    }
  }

  > div {
    width: 604px;
    border: 1px solid #f5f5f5;
    flex-wrap: wrap;
    text-align: center;
    font-size: 0;

    > div {
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
  transition: all 0.3s ease;
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
    transition: 0.3s ease;
  }
}

.checkbox-weather input[type="checkbox"] {
  visibility: hidden;
  display: none;
}

.checkbox-weather *,
.checkbox-weather ::after,
.checkbox-weather ::before {
  box-sizing: border-box;
}

/* The switch - the box around the slider */
.checkbox-weather .switch {
  --width-of-switch: 111px;
  --height-of-switch: 48px;
  /* size of sliding icon -- sun and moon */
  --size-of-icon: 38px;
  /* it is like a inline-padding of switch */
  --slider-offset: 8px;
  position: relative;
  width: var(--width-of-switch);
  height: var(--height-of-switch);
  display: inline-block;
}

/* The slider */
.checkbox-weather .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;
  transition: 0.4s;
  border-radius: 30px;
}

.checkbox-weather .slider:before {
  position: absolute;
  content: "";
  height: var(--size-of-icon, 1.4em);
  width: var(--size-of-icon, 1.4em);
  border-radius: 20px;
  left: var(--slider-offset, 0.3em);
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
  transition: 0.4s;
}

.checkbox-weather input:checked + .slider {
  background-color: #303136;
}

.checkbox-weather input:checked + .slider:before {
  left: calc(100% - (var(--size-of-icon, 1.4em) + var(--slider-offset, 0.3em)));
  background: #303136;
  /* change the value of second inset in box-shadow to change the angle and direction of the moon  */
  box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb;
}
</style>
