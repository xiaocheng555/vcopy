import { BrowserWindow, shell } from 'electron'
import path from 'path'

export default function createCopyWindow(url: string) {
  const copyWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/copy.js'),
      sandbox: false,
      webSecurity: false
    }
  })
  copyWindow.loadURL(url)
  // copyWindow 窗口只能在当前窗口跳转
  copyWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
  return copyWindow
}
