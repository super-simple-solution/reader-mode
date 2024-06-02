import { getEle } from '@/utils'

export function applyNewStyles(data: { fontFamily: any }) {
  const contentEle = getEle('[data-mark="sss-offset"]') as HTMLElement
  if (!contentEle) return
  contentEle.style.fontFamily = data.fontFamily
}
