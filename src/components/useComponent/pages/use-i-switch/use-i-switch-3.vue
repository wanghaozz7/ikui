<template>
  <div :style="getVariable">
    <div class="row">
      <i-switch
        @change="handleChange"
        class="item"
        type="seesaw"
        v-model="seesaw"
      />
      <i-switch
        @change="handleChange"
        class="item"
        type="pancake"
        v-model="pancake"
      />
      <i-switch
        @change="handleChange"
        class="item"
        type="transparent"
        v-model="transparent"
      />
      <i-switch
        @change="handleChange"
        class="item"
        type="weather"
        v-model="weather"
      />
    </div>
    <div class="row">
      <i-switch
        @change="handleChange"
        class="item"
        type="overturn"
        v-model="overturn"
      />
      <i-switch
        @change="handleChange"
        class="item"
        type="parallelogram"
        v-model="parallelogram"
      />
      <i-switch
        @change="handleChange"
        class="item"
        type="ripple"
        v-model="ripple"
      />
      <i-switch
        @change="handleChange"
        class="item"
        type="roll"
        v-model="roll"
      />
    </div>
    <div class="row">
      <i-switch
        @change="handleChange"
        class="item"
        type="face"
        v-model="face"
      />
      <i-switch @change="handleChange" class="item" type="dog" v-model="dog" />
      <i-switch
        @change="handleChange"
        class="item"
        type="displace"
        v-model="displace"
      />
      <i-switch
        @change="handleChange"
        class="item"
        type="basketball"
        v-model="basketball"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
let face = true,
  displace = false,
  dog = true,
  basketball = false,
  overturn = true,
  parallelogram = false,
  ripple = true,
  roll = false,
  seesaw = ref(true),
  pancake = false,
  transparent = true,
  weather = false;

const handleChange = (value) => {
  console.log(value);
  console.log(
    face,
    displace,
    dog,
    basketball,
    overturn,
    parallelogram,
    ripple,
    roll,
    seesaw,
    pancake,
    transparent,
    weather
  );
};

const getVariable = computed(() => {
  const bgc = seesaw.value ? "rgb(187, 253, 187)" : "lightgray";
  return {
    "--bgc": bgc,
  };
});
</script>

<style scoped lang="less">
.row {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 2px solid #fff;
  background-color: var(--bgc);
  padding: 50px;
  transition: all 0.3s;

  &:last-child {
    border-bottom: 0px solid transparent;
  }

  .item {
    flex: 1;
  }
}
</style>
