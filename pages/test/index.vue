<template>
  <div>
    <p>{{ clickData }}</p>
    <button @click="handleClick">点击++</button>
    <button @click="handleClickSub">点击--</button>
  </div>
</template>
<script setup lang="ts">
import { useButton } from "./useButton";

const { handleClick, clickData } = useButton();
const handleClickSub = () => {
  clickData.value--;
};
</script>
