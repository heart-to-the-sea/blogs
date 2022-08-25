
<template>
  <div>
    <BlogHeader root-dom-name=".main"></BlogHeader>
    <main class="main" ref="box">
      <BlogBox v-for="index in 10" :key="index"></BlogBox>
    </main>
  </div>
</template>

<script setup lang="ts">
import BlogBox from '../components/index/BlogBox.vue';
import BlogHeader from '../components/index/BlogHeader.vue' 
</script>
<style>
.mark {
  color:red;
}
</style>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
<style>
  .main {
    width: 700px;
    min-height: 90vh;
    margin: auto;
    margin-top: 75px;
  }
</style>