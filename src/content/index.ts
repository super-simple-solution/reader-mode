import '@/style/index.scss'
import { initEventHandler } from '@/utils/extension-action'
import Focus from './blur'
import { PatternData } from '@/types/local.d'

const contentReq = {
  'toggle-enable': toggleEnable,
}

initEventHandler(contentReq)

let focusIns: Focus
function init() {
  const domain = location.hostname
  chrome.storage.sync.get(domain).then((res) => {
    const { autoFocus } = res[domain] || {}
    chrome.runtime
      .sendMessage({
        greeting: 'to-get-pattern',
        data: { domain },
      })
      .then((res: PatternData | null) => {
        if (!res) return
        if (res.selector) {
          focusIns = new Focus(res.selector, autoFocus)
        }
      })
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

function toggleEnable(enable = true) {
  if (!focusIns) return
  enable ? focusIns?.init() : focusIns.unFocus()
}
