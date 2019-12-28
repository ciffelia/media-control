const { app, BrowserWindow } = require('electron')
const path = require('path')

const isProduction = require('./isProduction')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 300,
    webPreferences: {
      devTools: !isProduction,
      preload: path.join(__dirname, '../renderer/preload.js')
    }
  })

  if (!isProduction) mainWindow.webContents.openDevTools()

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
}

app.on('ready', createWindow)
