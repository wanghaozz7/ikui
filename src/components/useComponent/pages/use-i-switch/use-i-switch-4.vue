<template>
  <div class="row">
    <i-switch
      v-model="val"
      @change="handleChange"
      activeText="开灯"
      inactiveText="关灯"
      class="item"
    />
    <i-switch
      v-model="val"
      @change="handleChange"
      activeText="开灯"
      inactiveText="关灯"
      class="item"
      :width="120"
      :height="40"
    />
    <i-switch
      v-model="val"
      @change="handleChange"
      activeText="开灯"
      inactiveText="关灯"
      class="item"
      :width="150"
      :height="50"
    />
  </div>
</template>

<script setup>
let val = false;

const handleChange = (value) => {
  console.log("val", val, value);
};
</script>

<style scoped lang="less">
.row {
  padding: 20px;
  display: flex;

  .item {
    flex: 1;
  }
}
</style>
