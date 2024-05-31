import { getEle } from '@/utils'

export function applyNewStyles(form: { fontFamily: any }) {
  getEle('[data-mark="sss-offset"]')?.style.fontFamily = form.fontFamily
}
