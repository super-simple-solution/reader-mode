const blurStyle = 'sss-blur'

class Focus {
  selector: string
  isFocus: boolean = false
  constructor(selector: string, autoFocus?: boolean) {
    this.selector = selector
    if (autoFocus) {
      this.init()
      this.isFocus = true
    }
  }

  init() {
    if (this.isFocus || !this.selector) return
    const target = document.querySelector(this.selector)
    if (!target) return
    passThrough(target as HTMLElement, (element: HTMLElement) => {
      element.classList.add(blurStyle)
    })
    this.isFocus = true
  }

  unFocus() {
    if (!this.isFocus || !this.selector) return
    const target = document.querySelector(this.selector)
    if (!target) return
    passThrough(target as HTMLElement, (element: HTMLElement) => {
      element.classList.remove(blurStyle)
    })
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
