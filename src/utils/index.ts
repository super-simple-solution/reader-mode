export function getEle(el: string, context?: Element | null) {
  if (!el) return
  return (context || document).querySelector(el)
}

export function $$(el: string, context?: Element | null) {
  if (!el) return []
  return Array.from((context || document).querySelectorAll(el))
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

export function getNumber(str: string | null | undefined): number {
  return Number((str || '').replace(/[^(\d|.)]/g, ''))
}
