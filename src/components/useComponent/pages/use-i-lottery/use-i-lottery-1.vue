<template>
  <i-lottery :group="group"  @rollStart="handleStart" @rollEnd="handleEnd" />
</template>
<script setup>
const group = [
  {
    title: "rgba(250,91,61,1)",
    weight: 1,
    bgc: "rgba(250,91,61,1)",
  },
  {
    title: "blue",
    weight: 1,
    bgc: "blue",
  },
  {
    title: "yellow",
    weight: 1,
    bgc: "yellow",
  },
  {
    title: "pink",
    weight: 1,
    bgc: "pink",
  },
];

const handleStart = arg => {
  console.log('start', arg.title);
}
const handleEnd = arg => {
  console.log('end', arg.title);
}
</script>
