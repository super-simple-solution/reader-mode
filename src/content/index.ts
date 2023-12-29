import hotkeys from 'hotkeys-js'
import '@/style/index.scss'
import { isEmpty } from '@/utils'
import { initEventHandler } from '@/utils/extension-action'
import Focus from './blur'
import { NON_AUTO_KEY } from '@/const'
import { PatternData } from '@/types/local.d'

const contentReq = {
  'toggle-enable': toggleEnable,
  'block-element': blockElement,
  'cancel-element': cancelElement,
}
const selectedClass = 'sss-select'

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

function blockElement() {
  document.body.addEventListener('mouseover', (event: MouseEvent) => {
    const target = event.target as HTMLElement
    target.classList.add(selectedClass)
  })
  document.body.addEventListener('mouseout', (event: MouseEvent) => {
    const target = event.target as HTMLElement
    target.classList.remove(selectedClass)
  })
  document.body.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement
    console.log(target)
    // window.open('assets/icons/128.png', '', 'width=600, height=300')
    if (!target.classList?.contains(selectedClass)) return
    openWindow()
  })
}

function openWindow() {
  chrome.runtime
    .sendMessage({
      greeting: 'to-open-window',
    })
    .then(() => {
      console.log('openwindow')
    })
}

function cancelElement() {
  console.log('cancel')
}
