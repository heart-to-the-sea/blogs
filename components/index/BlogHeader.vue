<template>
  <header class="header">
    <slot name="left"></slot>
    <slot name="center"> </slot>
    <slot name="right"></slot>
  </header>
</template>

<style scoped lang="less">
.header {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #33333333;
  box-shadow: 0 0 10px #33333322;
  display: flex;
  justify-content: center;
  position: fixed;
  background-color: #fff;
  top: 0;
  z-index: 999;
}
</style>
