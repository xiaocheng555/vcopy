import { ipcRenderer } from 'electron'
import axios from 'axios'

ipcRenderer.invoke('get-config').then((config) => {
  if (config?.isCrack) {
    hackCore()
    // 加载解除禁止复制的脚本【来源：chrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/ask.html?aid=3498302c-4cea-4085-a740-bf3d835acdc2】
    import('./core.js')
  }
})

// 兼容core脚本
function hackCore () {
  // unsafeWindow为了兼容 core 脚本
  const win: any = window
  win.unsafeWindow = window
  win.GM_xmlhttpRequest = (config) => {
    const { method, url, onload } = config
    axios({
      method,
      url,
    }).then(res => {
      onload && onload(res)
    })
  }
}
