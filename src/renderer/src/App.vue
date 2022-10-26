<script setup lang="ts">
function open () {
  window.open('http://baidu.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
}
</script>

<template>
  <el-button type="primary" @click="open">打开</el-button>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
