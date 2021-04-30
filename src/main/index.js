import {app, BrowserWindow, ipcMain, globalShortcut} from 'electron'
import defaultSettings from '../renderer/settings'


const {
  windowHeight,
  windowWidth,
  title,
  isDevTools,
  showFrame,
  isResizable
} = defaultSettings

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// 嵌入网易云音乐 NodeJS 版 API
require('./app.js');

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: windowHeight,
    width: windowWidth,
    minHeight: windowHeight, // 窗口最小宽度，默认为 0
    minWidth: windowWidth, // 窗口最小高度，默认为 0.
    useContentSize: true, // width 和 height 使用web网页size, 这意味着实际窗口的size应该包括窗口框架的size，稍微会大一点，默认为 false.
    resizable: isResizable, // 是否可放大  禁止改变主窗口尺寸,设置过后，mainWindow.isMaximized()总是返回false
    frame: showFrame, // PS:隐藏窗口菜单
    title: title,
    webPreferences: {
      nodeIntegration: true, //
      webSecurity: false,
      devTools: isDevTools
    }
  })

  mainWindow.loadURL(winURL)
  if (process.env.NODE_ENV === 'development') {
    //重点在下面这行，开启调试
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

//自定义边框以后使用事件
// 最小化窗体
ipcMain.on('minWindow', () => {
  mainWindow.minimize()
})

//关闭窗体
ipcMain.on('closeWindow', () => {
  mainWindow.close()
})

// 最大化窗体（或还原）
ipcMain.on('maxWindow', (event, obj) => {
  if (obj.winFlag) {
    mainWindow.maximize()
  } else {
    mainWindow.setContentSize(windowWidth, windowHeight) //重新设置窗口客户端的宽高值（例如网页界面），这里win.setSize(x,y)并不生效。
    mainWindow.center() // 窗口居中
  }
  // mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
