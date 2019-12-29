const { remote } = require('electron')

class WindowManager {
  constructor () {
    this.showWindow = this.showWindow.bind(this)
    this.hideWindow = this.hideWindow.bind(this)
  }

  init () {
    this.browserWindow = remote.getCurrentWindow()

    const [width, height] = this.browserWindow.getSize()
    this.width = width
    this.height = height

    remote.globalShortcut.register('CommandOrControl+Alt+Shift+M', this.showWindow)
    document.addEventListener('mouseleave', this.hideWindow)
  }

  destroy () {
    remote.globalShortcut.unregister('CommandOrControl+Alt+Shift+M')
    document.removeEventListener('mouseleave', this.hideWindow)
  }

  showWindow () {
    const { x, y } = remote.screen.getCursorScreenPoint()
    this.browserWindow.setPosition(x - this.width / 2, y - this.height / 2)

    this.browserWindow.show()
  }

  hideWindow () {
    this.browserWindow.hide()
  }
}

module.exports = WindowManager
