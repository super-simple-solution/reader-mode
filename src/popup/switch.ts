import { isEmpty } from '@/utils'
import { getActiveTab } from '@/utils/extension-action'

export default class {
  el: HTMLInputElement
  storageKey: string
  constructor(el: HTMLInputElement, storageKey: string) {
    this.el = el
    this.storageKey = storageKey
    this.init()
  }
  init() {
    getActiveTab().then(({ url }) => {
      const domain = new URL(url).hostname
      chrome.storage.sync.get(this.storageKey).then(({ [this.storageKey]: domainList }) => {
        const auto_focus =
          !domainList ||
          isEmpty(domainList) ||
          !domainList.find((item: string) => domain === item || item.endsWith(domain))
        this.el.checked = auto_focus
      })
    })
    this.el?.addEventListener('change', this.toggle.bind(this))
  }
  toggle() {
    getActiveTab()
      .then(({ id, url }) => {
        const checked = this.el.checked
        const domain = new URL(url).hostname
        chrome.storage.sync.get(this.storageKey).then(({ [this.storageKey]: domainList }) => {
          if (!domainList || isEmpty(domainList)) domainList = []
          const domainIndex = domainList.indexOf(domain)
          if (checked && domainIndex !== -1) {
            domainList.splice(domainIndex, 1)
          }
          if (!checked && domainIndex === -1) {
            domainList.push(domain)
          }
          chrome.storage.sync.set({ [this.storageKey]: domainList })
        })
        chrome.tabs.sendMessage(id, { greeting: 'toggle-enable', data: this.el.checked })
      })
      .catch((e) => {
        console.error(e.message)
      })
  }
}
