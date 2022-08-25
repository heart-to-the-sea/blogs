<template>
  <div>
    <BlogHeader>
      <template v-slot:center>
        <div class="center-box">
          <BlogInput root-dom-name=".main" />
        </div>
      </template>
    </BlogHeader>
    <main class="main" ref="box">
      <BlogBox v-for="index in 10" :key="index"></BlogBox>
    </main>
  </div>
</template>

<script setup lang="ts">
import BlogBox from "../components/index/BlogBox.vue";
import BlogHeader from "../components/index/BlogHeader.vue";
</script>
<style>
.mark {
  color: red;
}
.jump-mark {
  background-color: red;
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
.center-box {
  width: 700px;
  height: 50px;
  display: flex;
  align-items: center;
}
.center {
  margin: auto;
  margin-top: 75px;
  margin-left: 20%;
  width: 50vw;
  min-height: 90vh;
  background-color: antiquewhite;
}
</style>
