import hotkeys from 'hotkeys-js'
import '@/style/index.scss'
import { isEmpty } from '@/utils'
import { initEventHandler } from '@/utils/extension-action'
import Focus from './blur'
import { NON_AUTO_KEY } from '@/const'
import { PatternData } from '@/types/local.d'

const contentReq = {
  'toggle-enable': toggleEnable,
  'to-detect': toDetect,
  'to-cancel': toCancel,
  'to-preview': toPreview,
}
const detectClass = 'sss-detect'

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

let isClick = false
let target: HTMLElement
function toDetect() {
  document.body.addEventListener('mouseover', (event: MouseEvent) => {
    if (isClick) return
    const target = event.target as HTMLElement
    target.classList.add(detectClass)
  })
  document.body.addEventListener('mouseout', (event: MouseEvent) => {
    if (isClick) return
    const target = event.target as HTMLElement
    target.classList.remove(detectClass)
  })
  document.body.addEventListener('click', (event: MouseEvent) => {
    target = event.target as HTMLElement
    if (!target.classList?.contains(detectClass)) return
    openWindow(target)
    isClick = true
  })
}

function toPreview() {
  if (!target.classList?.contains(detectClass)) return
  target.classList.add('sss-preview')
}

function openWindow(target: HTMLElement) {
  chrome.runtime
    .sendMessage({
      greeting: 'to-open-window',
      data: 111,
    })
    .then(() => {
      console.log(target, 'openwindow')
    })
}

function toCancel() {
  isClick = false
  console.log('cancel')
}
