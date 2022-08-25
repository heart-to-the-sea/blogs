<template>
  <input placeholder="请输入关键字查询" v-model="data" @input="handleInput" />
</template>
<script setup lang="ts">
import { defineProps, ref, defineEmits } from "vue";
import { LocalSearch } from "../utils/index";
const localSearch = new LocalSearch();

const data = ref("");
const props = defineProps(["rootDomName"]);
const emit = defineEmits(["input"]);
let timeout = -1;
localSearch.setRootDom(props.rootDomName);
const handleInput = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = window.setTimeout(() => {
    localSearch.cleanMark();
    localSearch.setSearchStr(data.value).queryTextDom().mark();
  });
};
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
