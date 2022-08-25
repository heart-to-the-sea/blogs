<template>
  <div style="position: relative; width: 100%" @blur="handleFocus(0)">
    <input
      placeholder="请输入关键字查询"
      v-model="data"
      @input="handleInput"
      @focus="handleFocus(1)"
    />
    <div class="option" v-show="list.length && visible">
      <div class="list-box">
        <div v-for="(item, index) in list" :key="index" style="width: 100%">
          <div
            class="list-node"
            v-html="item.html"
            @click="jumpToDom(item)"
          ></div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import useBlogInput from "./blogInput";

const props = defineProps(["rootDomName"]);

const visible = ref(0);
const handleFocus = (val: number) => {
  visible.value = val;
};
const { data, handleInput, list, jumpToDom } = useBlogInput(props);
</script>
<style scoped>
input {
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  background-color: #fff;
  border: 1px solid #33333322;
  padding: 5px 15px;
  border-radius: 5px;
}
input::placeholder {
  color: rgb(186, 186, 186);
  user-select: none;
}
</style>
<style lang="less" scoped>
.option {
  width: 100%;
  position: absolute;
  padding-top: 5px;
  z-index: 999;
  .list-box {
    width: 100%;
    min-height: 20px;
    max-height: 600px;
    overflow-y: auto;
    border: 1px solid #33333322;
    padding: 5px 15px;
    border-radius: 5px;
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.list-node {
  height: 35px;
  width: 100%;
  cursor: pointer;
  line-height: 35px;
  text-overflow: ellipsis;
  word-wrap: normal;
  overflow: hidden;
  border-bottom: 1px solid #33333322;
}
</style>
