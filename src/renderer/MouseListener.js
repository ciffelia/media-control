const { ipcRenderer } = require('electron')

class MouseListener {
  constructor () {
    this._handleClick = this._handleClick.bind(this)
    this._handleAuxclick = this._handleAuxclick.bind(this)
    this._handleWheel = this._handleWheel.bind(this)
  }

  init () {
    document.addEventListener('click', this._handleClick)
    document.addEventListener('auxclick', this._handleAuxclick)
    document.addEventListener('wheel', this._handleWheel)
  }

  destroy () {
    document.removeEventListener('click', this._handleClick)
    document.removeEventListener('auxclick', this._handleAuxclick)
    document.removeEventListener('wheel', this._handleWheel)
  }

  _handleClick () {
    this._handleLeftClick()
  }

  _handleAuxclick (e) {
    switch (e.button) {
      case 1:
        this._handleMiddleClick()
        break
      case 2:
        this._handleRightClick()
        break
    }
  }

  _handleWheel (e) {
    if (e.deltaY < 0) {
      this._handleWheelUp()
    } else if (e.deltaY > 0) {
      this._handleWheelDown()
    }
  }

  _handleLeftClick () {
    ipcRenderer.send('controlMedia', 'mediaNextTrack')
  }

  _handleRightClick () {
    ipcRenderer.send('controlMedia', 'mediaPrevTrack')
  }

  _handleMiddleClick () {
    ipcRenderer.send('controlMedia', 'mediaPlayPause')
  }

  _handleWheelUp () {
    ipcRenderer.send('controlMedia', 'volumeUp')
  }

  _handleWheelDown () {
    ipcRenderer.send('controlMedia', 'volumeDown')
  }
}

module.exports = MouseListener
