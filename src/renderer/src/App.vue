<script setup lang="ts">
import { ref } from 'vue'

const { ipcRenderer } = window.electron
const keyword = ref('')
const isCrack = ref(true)
const testUrls = [
  'http://www.360doc.com/content/22/1023/04/65631719_1052806961.shtml' // 360图书馆
]

function openUrl () {
  if (keyword.value?.trim()) {
    ipcRenderer.send('create-copy-window', keyword.value)
  }
}

function toggleIsCrack (val) {
  ipcRenderer.send('change-config:isCrack', val)
}

ipcRenderer.invoke('get-config').then(config => {
  isCrack.value = config?.isCrack
})
</script>

<template>
  <h1 class="app-title">破解复制禁用</h1>
  <div class="app-input">
    <el-input v-model="keyword" size="large" placeholder="请输入网址">
      <template #append>
        <el-button type="primary" @click="openUrl">打 开</el-button>
      </template>
    </el-input>
  </div>
  <div class="app-desc">
    <p>使用方法：输入网址并打开，打开后网页就可以进行复制了.</p>
  </div>

  <!-- TODO: 调试 -->
  <div style="margin-top: 60px; background: #eee; padding: 20px; border-radius: 4px;">
    <h4>启动破解:</h4>
    <el-switch v-model="isCrack" @change="toggleIsCrack"></el-switch>
    <br>
    <br>
    <h4>调试地址：</h4>
    <div v-for="(url, index) in testUrls" :key="index">{{url}}</div>
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';

#app {
  margin: auto;
  padding: 40px;
  box-sizing: border-box;
  min-width: 300px;
}
.app-title {
  margin: auto;
  margin-top: 6vh;
  font-weight: 400;
  font-size: 30px;
  text-align: center;
}
.app-input {
  margin: 50px auto 0;
}
.app-desc {
  margin-top: 20px;
}
</style>
