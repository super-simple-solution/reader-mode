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
    this.originalTransform = target.style?.transform
    passThrough(target, (element: HTMLElement) => {
      element.classList.add(blurClassName)
    })
    target.classList.add(offsetClassName)
    target.style.transform = `translateX(
      document.body.clientWidth - target.offsetWidth - target.getBoundingClientRect().left + 'px',
    )`
    this.isFocus = true
  }

  unFocus() {
    if (!this.isFocus || !this.selector) return
    const target = document.querySelector(this.selector) as HTMLElement
    if (!target) return
    passThrough(target, (element: HTMLElement) => {
      element.classList.remove(blurClassName)
    })
    target.classList.remove(offsetClassName)
    target.style.transform = this.originalTransform || ''
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
