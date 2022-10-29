<script setup lang="ts">
import { ref } from 'vue'

const { ipcRenderer, process } = window.electron
const isDev = process.env.NODE_ENV === 'development'
const keyword = ref('')
const isCrack = ref(true)
const isDebugger = ref(true)
const testUrls = [
  'https://www.doc88.com/p-9995635767564.html', // 刀客巴巴（不支持）
  'https://wenku.baidu.com/view/0c2a705b69d97f192279168884868762caaebb35.html?fr=hp_doclist', //百度文库
  'https://boke112.com/post/10528.html', // boke112
  'http://www.360doc.com/content/22/1023/04/65631719_1052806961.shtml', // 360图书馆
  'http://www.wenxm.cn/lunwen/yishu/meishu/1206629.html' // 其他
]

if (isDev) {
  keyword.value = testUrls[0]
}

// focus 时，选中文本
function onInputFocus (e) {
  e.target.select()
}

// 打开链接
function openUrl () {
  if (keyword.value?.trim()) {
    ipcRenderer.send('create-copy-window', keyword.value)
  }
}

// 切换配置
function toggleIsCrack (val) {
  ipcRenderer.send('change-config:isCrack', val)
}

ipcRenderer.invoke('get-config').then(config => {
  isCrack.value = config?.isCrack
})
</script>

<template>
  <h1 class="app-title">破解网页复制禁用</h1>
  <div class="app-input">
    <el-input v-model="keyword" size="large" placeholder="请输入网址" @focus="onInputFocus">
      <template #append>
        <el-button type="primary" @click="openUrl">打 开</el-button>
      </template>
    </el-input>
  </div>
  <div class="app-desc">
    <p>使用方法：输入网址并打开，打开网页后就可以进行复制了</p>
  </div>

  <!-- TODO: 调试 -->
  <div v-if="isDev && isDebugger" style="margin-top: 60px; background: #eee; padding: 20px; border-radius: 4px;">
    <h4>启动破解脚本:</h4>
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
