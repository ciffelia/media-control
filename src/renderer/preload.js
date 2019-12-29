const WindowManager = require('./WindowManager')
const MouseListener = require('./MouseListener')

const windowManager = new WindowManager()
const mouseListener = new MouseListener()

window.addEventListener('DOMContentLoaded', () => {
  windowManager.init()
  mouseListener.init()
})

window.addEventListener('close', () => {
  windowManager.destroy()
  mouseListener.destroy()
})
