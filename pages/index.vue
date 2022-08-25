
<template>
  <div ref="box">
    <input @input="handleInput" />
    <p ref="pp">123888</p>
  </div>
</template>
<script setup lang="ts">
import { initCustomFormatter, ref } from 'vue';
import {LocalSearch} from '../utils/index' 
const data = ref('');
const box = ref<HTMLDivElement>(null)
const localSearch = new LocalSearch()
const pp = ref<HTMLPreElement>(null)
const handleInput = () => {
  localSearch.cleanMark()
  localSearch.setSearchStr(data.value).queryTextDom().mark()
}
onMounted(()=>{
  localSearch.setRootDom<HTMLDivElement>(box.value)
})
</script>
<style>
.mark {
  color:red;
}
</style>
