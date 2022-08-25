<template>
  <BlogHeader>
    <template v-slot:left> </template>
    <template v-slot:center>
      <div class="center-box">
        <BlogInput root-dom-name=".main" />
      </div>
    </template>
  </BlogHeader>
  <BlogLeftBox />
  <BlogRightBox />
  <div class="center"></div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import BlogHeader from "../../components/index/BlogHeader.vue";
import BlogLeftBox from "../../components/doc/BlogLeftBox.vue";
import BlogRightBox from "../../components/doc/BlogRightBox.vue";
</script>
<style lang="less" scoped>
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
