<template>
  <div class="toggle checkbox-displace">
    <input class='tgl tgl-ios' :id="id" type='checkbox' v-model="inputValue" @change="handleChange">
    <label class='tgl-btn' :for="id" />
  </div>
</template>

<script setup name="switch-displace">
const emits = defineEmits(['change'])

const props = defineProps({
  defaultValue: {
    type: Boolean,
    default: true
  }
})

let inputValue = props.defaultValue

const handleChange = e => {
  emits('change', inputValue)
}
const getRandomNodeId = () => {
  return 'displace' + Date.now() + Math.ceil(Math.random() * 100000);
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

.checkbox-displace {
  --blue: #0D7EFF;
  --g08: #E1E5EB;
  --g04: #848ea1;
}

.checkbox-displace .tgl {
  display: none;
}

.checkbox-displace .tgl,
.checkbox-displace .tgl:after,
.checkbox-displace .tgl:before,
.checkbox-displace .tgl *,
.checkbox-displace .tgl *:after,
.checkbox-displace .tgl *:before,
.checkbox-displace .tgl+.tgl-btn {
  box-sizing: border-box;
}

.checkbox-displace .tgl::selection,
.checkbox-displace .tgl:after::selection,
.checkbox-displace .tgl:before::selection,
.checkbox-displace .tgl *::selection,
.checkbox-displace .tgl *:after::selection,
.checkbox-displace .tgl *:before::selection,
.checkbox-displace .tgl+.tgl-btn::selection {
  background: none;
}

.checkbox-displace .tgl+.tgl-btn {
  outline: 0;
  display: inline-block;
  width: 111px;
  height: 48px;
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
}

.checkbox-displace .tgl+.tgl-btn:after,
.checkbox-displace .tgl+.tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 40px;
  height: 40px;
}

.checkbox-displace .tgl+.tgl-btn:after {
  left: 2px;
  top: 2px;
}

.checkbox-displace .tgl+.tgl-btn:before {
  display: inline;
  position: absolute;
  top: 12px;
}

.toggle input:checked+.tgl-btn:after {
  left: 61.5%;
}

.checkbox-displace .tgl-ios+.tgl-btn {
  background: var(--g08);
  border-radius: 20rem;
  padding: 2px;
  transition: all 0.4s ease;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.checkbox-displace .tgl-ios+.tgl-btn:after {
  border-radius: 50%;
  background: #fff;
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), padding 0.3s ease, margin 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.checkbox-displace .tgl-ios+.tgl-btn:before {
  content: "No";
  left: 58px;
  color: var(--g04);
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.checkbox-displace .tgl-ios+.tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}

.checkbox-displace .tgl-ios+.tgl-btn:active:after {
  padding-right: 0.4em;
}

.toggle input:checked+.tgl-btn {
  background: var(--blue);
}

.toggle input:checked+.tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}

.toggle input:checked+.tgl-btn:active:after {
  margin-left: -0.4em;
}

.toggle input:checked+.tgl-btn:before {
  content: "Yes";
  left: 12px;
  color: #fff;
}
</style>
