import hotkeys from 'hotkeys-js'
import '@/style/content.scss'
import { NON_AUTO_KEY } from '@/const'
import type { FocusConfig, PatternData } from '@/types/local.d'
import { isEmpty } from '@/utils'
import { initEventHandler } from '@/utils/extension-action'
import Focus from './focus'
import rightMenu from './rightMenu'
import { applyNewStyles } from './util'

const contentReq = {
  'toggle-enable': toggleEnable,
  'update-style': updatePageStyles,
}

initEventHandler(contentReq)

let focusIns: Focus
function init() {
  const domain = location.hostname
  chrome.storage.sync.get(NON_AUTO_KEY).then(({ [NON_AUTO_KEY]: domainList }) => {
    const needFocus =
      !domainList ||
      isEmpty(domainList) ||
      !domainList.find((item: string) => domain === item || item.endsWith(domain))
    if (!needFocus) return
    chrome.runtime
      .sendMessage({
        greeting: 'to-get-pattern',
        data: { domain },
      })
      .then((res: PatternData | null) => {
        if (!res) return
        if (res.selector) {
          focusIns = new Focus({
            selector: res.selector,
            needFocus,
            needCenter: false,
          })
        }
      })
  })
}

init()

hotkeys('shift+up,esc', (_, handler) => {
  switch (handler.key) {
    case 'shift+up':
      if (focusIns) {
        focusIns.init()
      }
      break
    case 'esc':
      if (focusIns) {
        focusIns.unFocus()
      }
      break
    default:
  }
})

const styleKey = 'style'
const centerKey = 'center'
function logStorageChange(changes: { [x: string]: any }) {
  const styleItem = changes[styleKey]
  const centerItem = changes[centerKey]
  if (styleItem) {
    applyNewStyles(styleItem.newValue)
  }
  if (centerItem) {
    focusIns?.toggleCenter()
  }
}

chrome.storage.sync.onChanged.addListener(logStorageChange)

function toggleEnable(enable = true) {
  if (!focusIns) return
  enable ? focusIns?.init() : focusIns.unFocus()
}

function updatePageStyles({ reader_mode, center, font_family }: FocusConfig) {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('updatePageStyles', reader_mode, center, font_family)
  // 修改背景色
  if (reader_mode) {
    focusIns?.toCenter()
  } else {
    focusIns?.unCenter()
  }

  // 居中内容
  if (center) {
    focusIns?.toCenter()
  } else {
    focusIns?.unCenter()
  }

  // 设置字体
  document.body.style.fontFamily = font_family === 'default' ? 'Arial, sans-serif' : font_family
}

rightMenu()
