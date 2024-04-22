<template>
  <div class="row">
    <i-switch
      v-model="val1"
      @change="handleChange"
      activeText="绿色"
      inactiveText="红色"
      class="item"
    />
    <i-switch
      v-model="val2"
      @change="handleChange"
      activeText="黄色"
      inactiveText="粉色"
      class="item"
      activeColor="yellow"
      inactiveColor="pink"
    />
  </div>
</template>

<script setup>
let val1 = true,
  val2 = false;

const handleChange = (value) => {
  console.log("val", val1, val2, value);
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
