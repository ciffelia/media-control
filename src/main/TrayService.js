const path = require('path')
const { app, Menu, Tray } = require('electron')

class TrayService {
  constructor () {
    this.init = this.init.bind(this)
    this._handleExitClick = this._handleExitClick.bind(this)

    this._iconPath = path.join(__dirname, '../../assets/icon.png')
  }

  init () {
    this._tray = new Tray(this._iconPath)
    this._tray.setToolTip('media-control')

    const menu = Menu.buildFromTemplate([
      { label: 'Exit', type: 'normal', click: this._handleExitClick }
    ])
    this._tray.setContextMenu(menu)
  }

  _handleExitClick () {
    app.exit()
  }
}

module.exports = TrayService
