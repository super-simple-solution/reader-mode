export function getEle(selector: string, context?: Element | null) {
  if (!selector) return
  return (context || document.body).querySelector(selector)
}

export function $$(selector: string, context?: Element | null) {
  if (!selector) return []
  return Array.from((context || document.body).querySelectorAll(selector))
}

interface DynamicObject {
  [key: string]: string | number | null
}

export function getAttrs(el: Element) {
  const res = {} as DynamicObject
  for (const key in el.attributes) {
    if (isNaN(+key)) {
      res[key] = el.attributes[key].value
    }
  }
  return res
}

export function createEle(option: {
  tag?: string
  content: string
  class?: string
  style?: string
  attrs?: DynamicObject
}) {
  const { tag = 'div', content, class: className = '', style = {} } = option
  const el = document.createElement(tag)
  el.innerText = content || ''
  el.className = className
  Object.assign(el.style, style)
  return el
}

export function getEleBySelectorList(selectorList: string[], filter: (element: Element) => boolean = () => true) {
  let elRes
  for (const selector of selectorList) {
    elRes = getEle(selector)
    if (elRes && filter(elRes)) break
  }
  return elRes
}

export function getNumber(str: string | null | undefined): number {
  return Number((str || '').replace(/[^(\d|.)]/g, ''))
}

export function isEmpty(obj: object) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false
    }
  }
  return true
}
