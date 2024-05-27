import { getEleBySelectorList } from '@/utils'
const attributeKey = 'data-mark'
const blurStyle = 'sss-blur'
const offsetStyle = 'sss-offset'

class Focus {
  selector: string[]
  isFocus: boolean = false
  toBeCenter: boolean = true
  originalTransform: string = ''
  constructor(selector: string[], auto_focus?: boolean) {
    this.selector = selector
    if (auto_focus) {
      this.init()
      this.isFocus = true
    }
  }

  init() {
    if (this.isFocus || !this.selector) return
    const target = getEleBySelectorList(this.selector, nodeFilter) as HTMLElement
    if (!target) return
    this.originalTransform = window.getComputedStyle(target).transform
    passThrough(target, (element: HTMLElement) => {
      element.setAttribute(attributeKey, blurStyle)
    })
    target.setAttribute(attributeKey, offsetStyle)
    this.isFocus = true
    if (!this.toBeCenter) return
    setTimeout(() => {
      target.style.transform = `translateX(
        ${(document.body.clientWidth - target.offsetWidth) / 2 - target.getBoundingClientRect().left}px
      )`
    }, 50)
  }

  unFocus() {
    if (!this.isFocus || !this.selector) return
    const target = getEleBySelectorList(this.selector, nodeFilter) as HTMLElement
    if (!target) return
    passThrough(target, (element: HTMLElement) => {
      element.removeAttribute(attributeKey)
    })
    this.isFocus = false
    if (this.toBeCenter) {
      target.style.transform = this.originalTransform || ''
    }
    setTimeout(() => {
      target.removeAttribute(attributeKey)
    }, 600)
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
