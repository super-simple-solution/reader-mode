import { getEleBySelectorList } from '@/utils'
const attributeKey = 'data-mark'
const blurStyle = 'sss-blur'
const offsetStyle = 'sss-offset'

class Focus {
  selector: string[]
  target: HTMLElement
  focused: boolean = false
  toBeCenter: boolean = true
  centered: boolean = false
  originalTransform: string = ''
  constructor(selector: string[], auto_focus?: boolean) {
    this.selector = selector
    if (auto_focus) {
      this.init()
      this.focused = true
    }
  }

  init() {
    if (this.focused || !this.selector) return
    this.target = getEleBySelectorList(this.selector, nodeFilter) as HTMLElement
    if (!this.target) return
    this.originalTransform = window.getComputedStyle(this.target).transform
    passThrough(target, (element: HTMLElement) => {
      element.setAttribute(attributeKey, blurStyle)
    })
    this.target.setAttribute(attributeKey, offsetStyle)
    this.focused = true
    if (!this.toBeCenter) return
    setTimeout(() => {
      this.target.style.transform = `translateX(
        ${(document.body.clientWidth - target.offsetWidth) / 2 - target.getBoundingClientRect().left}px
      )`
    }, 50)
  }

  unFocus() {
    if (!this.focused || !this.target) return
    passThrough(this.target, (element: HTMLElement) => {
      element.removeAttribute(attributeKey)
    })
    this.focused = false
    if (this.toBeCenter) {
      this.target.style.transform = this.originalTransform || ''
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
      ${(document.body.clientWidth - target.offsetWidth) / 2 - this.target.getBoundingClientRect().left}px
    )`
  }
  unCenter() {
    if (!this.target || !this.centered) return
    this.target.style.transform = this.originalTransform || ''
  }
}

function passThrough(element: HTMLElement, fn: (element: HTMLElement) => undefined) {
  if (!element) return
  const parent = element.parentElement
  const elementList = parent?.children
  passThrough(parent as HTMLElement, fn)
  if (!elementList) return
  for (let i = 0; i < elementList.length; i++) {
    if (elementList[i] === element) continue
    fn(elementList[i] as HTMLElement)
  }
}

function nodeFilter(element: Element): boolean {
  const content = element.textContent
  return !!content && content.length > 200
}

export default Focus
