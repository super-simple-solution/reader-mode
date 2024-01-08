const DETECT_CLASS = 'sss-detect'
const PREVIEW_CLASS = 'sss-preview'
enum DetectState {
  Init = 0,
  Detecting = 1,
  Detected = 2,
}

export class Detect {
  detectState: DetectState = DetectState.Init
  target: HTMLElement | null = null
  handleOver = () => this.detectingAction(true)
  handleOut = () => this.detectingAction(false)
  handleConfirm = () => this.toConfirm
  constructor() {
    this.init()
  }
  init() {
    this.detectState = DetectState.Init
    this.target = null
  }
  toDetect() {
    this.detectState = DetectState.Detecting
    this.eventInit()
  }
  toCancel() {
    this.target && this.target.classList.remove(DETECT_CLASS)
    this.init()
    this.eventCancel()
    console.log('cancel')
  }
  toPreview() {
    if (!this.target || !this.target.classList?.contains(DETECT_CLASS)) return
    this.target.classList.add(PREVIEW_CLASS)
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
    if (!this.target || !this.target.classList?.contains(DETECT_CLASS)) return
    openWindow(this.target)
    this.detectState = DetectState.Detected
  }
  detectingAction(isHover: boolean) {
    return (event: MouseEvent) => {
      if (this.detectState === 2) return
      const target = event.target as HTMLElement
      this.target = target
      const classList = target.classList
      if (isHover) {
        classList.add(DETECT_CLASS)
      } else {
        classList.remove(DETECT_CLASS)
      }
    }
  }
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
