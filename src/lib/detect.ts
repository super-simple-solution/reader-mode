import Toastify from 'toastify-js'
import { initEventHandler, getActiveTab } from '@/utils/extension-action'

const DETECT_CLASS = 'sss-detect'
const PREVIEW_CLASS = 'sss-preview'
enum DetectState {
  Init = 0,
  Detecting = 1,
  Detected = 2,
}

export class Detect {
  detectState: DetectState = DetectState.Init
  targetEl: HTMLElement | null = null
  handleOver = () => this.detectingAction(true)
  handleOut = () => this.detectingAction(false)
  handleConfirm = () => this.toConfirm
  init() {
    initEventHandler({
      'to-detect': this.toDetect,
      'to-preview': this.preview,
      confirmed: this.reset,
    })
    this.reset()
  }
  reset() {
    this.detectState = DetectState.Init
    this.targetEl = null
    this.eventCancel()
  }
  toDetect() {
    this.eventInit()
    this.detectState = DetectState.Detecting
  }
  toCancel() {
    this.targetEl && this.targetEl.classList.remove(DETECT_CLASS)
    this.reset()
  }
  preview(selector: string | undefined) {
    if (selector) {
      try {
        this.targetEl = document.querySelector(selector)
      } catch (e: any) {
        Toastify({
          text: e.message,
        }).showToast()
        return
      }
    }
    if (!this.targetEl || !this.targetEl.classList?.contains(DETECT_CLASS)) {
      Toastify({
        text: 'No preview Element found, please check your Selector',
      }).showToast()
      return
    }
    this.targetEl.classList.add(PREVIEW_CLASS)
  }
  eventInit() {
    const body = document.body
    body.addEventListener('mouseover', this.handleOver)
    body.addEventListener('mouseout', this.handleOut)
    body.addEventListener('click', this.handleConfirm)
  }
  eventCancel() {
    const body = document.body
    body.removeEventListener('mouseover', this.handleOver)
    body.removeEventListener('mouseout', this.handleOut)
    body.removeEventListener('click', this.handleConfirm)
  }
  toConfirm() {
    if (!this.targetEl || !this.targetEl.classList?.contains(DETECT_CLASS)) return
    chrome.runtime.sendMessage({
      greeting: 'to-open-window',
      data: {
        selector: getSelectorByEl(this.targetEl),
      },
    })
    this.detectState = DetectState.Detected
  }
  detectingAction(isHover: boolean) {
    return (event: MouseEvent) => {
      if (this.detectState === 2) return
      const target = event.target as HTMLElement
      this.targetEl = target
      const classList = target.classList
      if (isHover) {
        classList.add(DETECT_CLASS)
      } else {
        classList.remove(DETECT_CLASS)
      }
    }
  }
}

export class DetectWindow {
  tabId: number = 0
  selector: string = ''
  cancelEle: HTMLElement | null = null
  previewEle: HTMLElement | null = null
  unselectEle: HTMLElement | null = null
  constructor() {
    this.init()
  }
  init() {
    initEventHandler({
      'to-detect': (data: { tabId: number; selector: string }) => {
        const { tabId, selector } = data
        this.tabId = tabId
        this.selector = selector
      },
    })
    this.cancelEle = document.getElementById('cancel')
    this.previewEle = document.getElementById('preview')
    this.unselectEle = document.getElementById('unselect')
    this.cancelEle?.addEventListener('click', () => {
      // close window
      getActiveTab().then(({ windowId }) => chrome.windows.remove(windowId))
    })

    this.unselectEle?.addEventListener('click', () => {
      console.log('unselect')
    })
    if (!this.previewEle) return
    this.previewEle.addEventListener('click', (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement
      const previewData = targetEl.getAttribute('data-preview')
      if (previewData === 'inactive') {
        targetEl.textContent = 'Exit Preview'
        targetEl.setAttribute('data-preview', 'active')
        chrome.tabs.sendMessage(this.tabId, { greeting: 'to-preview' })
      } else {
        targetEl.textContent = 'Preview'
        targetEl.setAttribute('data-preview', 'inactive')
        chrome.tabs.sendMessage(this.tabId, { greeting: 'to-exit-preview' })
      }
    })
  }
  preview() {
    chrome.tabs.sendMessage(this.tabId, {
      greeting: 'to-preview',
    })
  }
  confirm() {
    chrome.runtime.sendMessage({
      greeting: 'detect-confirm',
    })
  }
}

export class DetectService {
  tabId: number = 0
  windowId: number = 0
  constructor(tabId: number) {
    this.init(tabId)
  }
  init(tabId: number) {
    this.tabId = tabId
    initEventHandler({
      confirm: this.confirm,
      'to-detect': this.preDetect,
    })
  }
  destroy() {
    this.tabId = 0
  }
  confirm(selector: string) {
    // TODO: get domain and path
    chrome.storage.sync.set({ domain_path: selector })
  }
  openWindow(selector: string) {
    return chrome.windows
      .create({
        url: 'src/window/index.html',
        type: 'popup',
        width: 600,
        height: 300,
        focused: true,
        left: 0,
        top: 0,
      })
      .then((windowInfo) => {
        const { tabs } = windowInfo
        if (!tabs?.length || !tabs[0].id) return
        chrome.tabs.sendMessage(tabs[0].id, {
          greeting: 'to-detect',
          data: {
            selector,
            tabId: this.tabId,
          },
        })
      })
  }
  closeWindow() {
    chrome.windows.remove(this.windowId)
  }
  preDetect() {
    if (this.windowId !== 0) this.closeWindow()
    getActiveTab({ currentWindow: false }).then((tabId) => {
      this.tabId = tabId
      chrome.tabs.sendMessage(tabId, {
        greeting: '',
      })
    })
  }
  postDetect(selector: string) {
    this.openWindow(selector)
  }
}

// TODO: get select by element
function getSelectorByEl(element: HTMLElement): string {
  return element.className
}
