import { ipcMain } from 'electron'
import createCopyWindow from '../windows/copyWindow'

export default function initIpcEvent () {
  ipcMain.on('create-copy-window', (event, url: string) => {
    console.log(event)
    createCopyWindow(url)
  })
  ipcMain.on('change-config:isCrack', (event, data: boolean) => {
    console.log(event)
    global.Config.isCrack = data
  })
  ipcMain.handle('get-config', () => {
    return global.Config
  })
}
