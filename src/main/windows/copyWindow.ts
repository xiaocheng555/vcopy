import { BrowserWindow } from 'electron'
import path from 'path'

export default function createCopyWindow(url: string) {
  const copyWindow = new BrowserWindow({
    width: 900,
    height: 670,
    webPreferences: {
      preload: path.join(__dirname, '../preload/copy.js'),
      sandbox: false,
      // webSecurity: false
    }
  })
  copyWindow.loadURL(url)
  return copyWindow
}
