import hotkeys from 'hotkeys-js'
import '@/style/content.scss'
import { isEmpty } from '@/utils'
import { initEventHandler } from '@/utils/extension-action'
import Focus from './blur'
import { Detect } from '@/lib/detect'
import { NON_AUTO_KEY } from '@/const'
import { PatternData } from '@/types/local.d'

let detectInstance: Detect | null = null

const contentReq = {
  'toggle-enable': toggleEnable,
  'to-detect': toDetect,
  'to-cancel': toCancel,
  'to-preview': toPreview,
}

function toDetect() {
  if (!detectInstance) {
    detectInstance = new Detect()
  }
  detectInstance.toDetect()
}

function toCancel() {
  detectInstance && detectInstance.cancel()
}

function toPreview({ selector }: { selector: string }) {
  detectInstance && detectInstance.preview(selector)
}

initEventHandler(contentReq)

let focusIns: Focus
function init() {
  const domain = location.hostname
  chrome.storage.sync.get(NON_AUTO_KEY).then(({ [NON_AUTO_KEY]: domainList }) => {
    const auto_focus =
      !domainList || isEmpty(domainList) || !domainList.find((item: string) => domain === item || item.endsWith(domain))
    chrome.runtime
      .sendMessage({
        greeting: 'to-get-pattern',
        data: { domain },
      })
      .then((res: PatternData | null) => {
        if (!res) return
        if (res.selector) {
          focusIns = new Focus(res.selector, auto_focus)
        }
      })
  })
}

init()

hotkeys('shift+up,esc', function (event: KeyboardEvent, handler) {
  switch (handler.key) {
    case 'shift+up':
      focusIns && focusIns.init()
      break
    case 'esc':
      focusIns && focusIns.unFocus()
      break
    default:
  }
})

function toggleEnable(enable = true) {
  if (!focusIns) return
  enable ? focusIns?.init() : focusIns.unFocus()
}
