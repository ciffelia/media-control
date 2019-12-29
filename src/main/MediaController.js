const ffi = require('ffi')

class MediaController {
  constructor () {
    this.user32 = ffi.Library('user32', {
      keybd_event: ['void', ['uint8', 'uint8', 'uint32', 'ulong']]
    })
  }

  volumeMute () {
    // VK_VOLUME_MUTE: 0xAD
    this._emulateKeyPressAndRelease(0xAD)
  }

  volumeDown () {
    // VK_VOLUME_DOWN: 0xAE
    this._emulateKeyPressAndRelease(0xAE)
  }

  volumeUp () {
    // VK_VOLUME_UP: 0xAF
    this._emulateKeyPressAndRelease(0xAF)
  }

  mediaNextTrack () {
    // VK_MEDIA_NEXT_TRACK: 0xB0
    this._emulateKeyPressAndRelease(0xB0)
  }

  mediaPrevTrack () {
    // VK_MEDIA_PREV_TRACK: 0xB1
    this._emulateKeyPressAndRelease(0xB1)
  }

  mediaStop () {
    // VK_MEDIA_STOP: 0xB2
    this._emulateKeyPressAndRelease(0xB2)
  }

  mediaPlayPause () {
    // VK_MEDIA_PLAY_PAUSE: 0xB3
    this._emulateKeyPressAndRelease(0xB3)
  }

  _emulateKeyPressAndRelease (virtualKeyCode) {
    this._emulateKeyPress(virtualKeyCode)
    this._emulateKeyRelease(virtualKeyCode)
  }

  _emulateKeyPress (virtualKeyCode) {
    this.user32.keybd_event(virtualKeyCode, 0, 0, 0)
  }

  _emulateKeyRelease (virtualKeyCode) {
    // KEYEVENTF_KEYUP: 0x0002
    this.user32.keybd_event(virtualKeyCode, 0, 0x0002, 0)
  }
}

module.exports = MediaController
