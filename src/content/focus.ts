import { getEleBySelectorList } from '@/utils'
const attributeKey = 'data-mark'
const blurStyle = 'sss-blur'
const offsetStyle = 'sss-offset'

class Focus {
  target: HTMLElement
  needFocus = true
  focused = false // 已focus?
  needCenter = true // 需要居中?
  centered = false // 已居中?
  originalTransform = ''
  constructor(config: { selector: string[]; needFocus: boolean; needCenter: boolean }) {
    this.target = getEleBySelectorList(config.selector, nodeFilter) as HTMLElement
    this.needFocus = config.needFocus
    this.needCenter = config.needCenter
    if (!this.target) return
    if (this.needFocus) {
      this.init()
    }
  }

  init() {
    if (this.focused || !this.target) return
    passThrough(this.target, (element: HTMLElement) => {
      element.setAttribute(attributeKey, blurStyle)
    })
    this.target.setAttribute(attributeKey, offsetStyle)
    this.focused = true
    if (!this.needCenter) return
    setTimeout(this.toCenter, 50)
  }

  unFocus() {
    if (!this.focused || !this.target) return
    passThrough(this.target, (element: HTMLElement) => {
      element.removeAttribute(attributeKey)
    })
    this.focused = false
    if (this.needCenter) {
      this.unCenter()
    }
    setTimeout(() => {
      this.target.removeAttribute(attributeKey)
    }, 600)
  }

  toggleCenter() {
    this.centered ? this.unCenter() : this.toCenter()
  }

  toCenter() {
    if (!this.target || this.centered) return
    this.originalTransform = window.getComputedStyle(this.target).transform
    this.target.style.transform = `translateX(
      ${(document.body.clientWidth - this.target.offsetWidth) / 2 - this.target.getBoundingClientRect().left}px
    )`
    this.centered = true
  }
  unCenter() {
    if (!this.target || !this.centered) return
    this.target.style.transform = this.originalTransform || ''
    this.centered = false
  }
}

function passThrough(element: HTMLElement, fn: (element: HTMLElement) => undefined) {
  if (!element) return
  const parent = element.parentElement
  const elementList = parent?.children
  passThrough(parent as HTMLElement, fn)
  if (!elementList || !elementList.length) return
  for (let i = 0; i < elementList.length; i++) {
    if (elementList[i] === element) continue
    fn(elementList[i] as HTMLElement)
  }
}

function nodeFilter(element: HTMLElement): boolean {
  const content = element.textContent
  const height = element.offsetHeight
  return !!content && height > 500
}

export default Focus
