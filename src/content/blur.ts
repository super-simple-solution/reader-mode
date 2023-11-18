const blurClassName = 'sss-blur'
const offsetClassName = 'sss-offset'

class Focus {
  selector: string
  isFocus: boolean = false
  originalTransform: string = ''
  constructor(selector: string, autoFocus?: boolean) {
    this.selector = selector
    if (autoFocus) {
      this.init()
      this.isFocus = true
    }
  }

  init() {
    if (this.isFocus || !this.selector) return
    const target = document.querySelector(this.selector) as HTMLElement
    if (!target) return
    this.originalTransform = window.getComputedStyle(target).transform
    passThrough(target, (element: HTMLElement) => {
      element.classList.add(blurClassName)
    })
    target.classList.add(offsetClassName)
    setTimeout(() => {
      target.style.transform = `translateX(
        ${Math.abs((document.body.clientWidth - target.offsetWidth) / 2 - target.getBoundingClientRect().left)}px
      )`
    }, 50)
    this.isFocus = true
  }

  unFocus() {
    if (!this.isFocus || !this.selector) return
    const target = document.querySelector(this.selector) as HTMLElement
    if (!target) return
    passThrough(target, (element: HTMLElement) => {
      element.classList.remove(blurClassName)
    })
    target.style.transform = this.originalTransform || ''
    setTimeout(() => {
      target.classList.remove(offsetClassName)
    }, 600)
    this.isFocus = false
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

export default Focus
