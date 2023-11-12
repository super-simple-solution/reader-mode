import '@/style/index.scss'
import Focus from './blur'

let focusIns: Focus
function init() {
  const domain = location.hostname
  chrome.storage.sync.get(domain).then((res) => {
    const { selector, isFocus } = res[domain] || {}
    if (selector) {
      focusIns = new Focus(selector, isFocus)
    }
  })
}

init()

const keyCodeMap = {
  esc: 'Escape',
  top: 'ArrowUp',
}

document.addEventListener(
  'keydown',
  (e) => {
    if (keyCodeMap.esc === e.code) {
      focusIns && focusIns.unFocus()
    } else if (keyCodeMap.top === e.code) {
      focusIns && focusIns.init()
    }
  },
  false,
)
