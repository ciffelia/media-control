const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('path')
const TrayService = require('./TrayService')
const MediaController = require('./MediaController')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 100,
    height: 100,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    closable: false,
    focusable: false,
    alwaysOnTop: true,
    fullscreenable: false,
    skipTaskbar: true,
    icon: path.join(__dirname, '../../assets/icon.png'),
    show: false,
    frame: false,
    transparent: true,
    webPreferences: {
      contextIsolation: true,
      devTools: !app.isPackaged,
      preload: path.join(__dirname, '../renderer/preload.js')
    }
  })

  if (!app.isPackaged) mainWindow.webContents.openDevTools()

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))

  const trayService = new TrayService()
  trayService.init()

  const mediaController = new MediaController()

  ipcMain.on('controlMedia', (e, action) => {
    mediaController[action]()
  })
}

app.on('ready', createWindow)
