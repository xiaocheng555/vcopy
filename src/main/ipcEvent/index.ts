import { ipcMain } from 'electron'
import createCopyWindow from '../windows/copyWindow'

export default function initIpcEvent () {
  ipcMain.on('create-copy-window', (event, url: string) => {
    createCopyWindow(url)
  })
  ipcMain.on('change-config:isCrack', (event, data: boolean) => {
    global.Config.isCrack = data
  })
  ipcMain.handle('get-config', (event) => {
    return global.Config
  })
}
