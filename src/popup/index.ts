import './style.scss'
import { isEmpty } from '@/utils'
import { getActiveTab } from '@/utils/extension-action'
import { NON_AUTO_KEY } from '@/const'

const detectEle = document.querySelector('.detect')
const blockEle = document.querySelector('.block-element')
const cancelEle = document.querySelector('.cancel-element')
const switchEle = document.getElementById('switch') as HTMLInputElement
getActiveTab().then(({ url }) => {
  const domain = new URL(url).hostname
  chrome.storage.sync.get(NON_AUTO_KEY).then(({ [NON_AUTO_KEY]: domainList }) => {
    const auto_focus =
      !domainList || isEmpty(domainList) || !domainList.find((item: string) => domain === item || item.endsWith(domain))
    debugger
    console.log(domainList, 'domainList')
    console.log(auto_focus, 'auto_focus')
    switchEle.checked = auto_focus
  })
})

detectEle?.addEventListener('click', () => {
  // if ((e.target as Element).className !== 'btn') return
  getActiveTab().then(({ id }) => chrome.tabs.sendMessage(id, { greeting: 'to-detect' }))
})

blockEle?.addEventListener('click', () => {
  blockEle.setAttribute('style', 'display: none')
  cancelEle?.setAttribute('style', 'display: block')
  getActiveTab().then(({ id }) => chrome.tabs.sendMessage(id, { greeting: 'block-element' }))
})
cancelEle?.addEventListener('click', () => {
  blockEle?.setAttribute('style', 'display: block')
  cancelEle?.setAttribute('style', 'display: none')
  getActiveTab().then(({ id }) => chrome.tabs.sendMessage(id, { greeting: 'cancel-element' }))
})

switchEle?.addEventListener('change', () => {
  getActiveTab()
    .then(({ id, url }) => {
      const checked = switchEle.checked
      const domain = new URL(url).hostname
      chrome.storage.sync.get(NON_AUTO_KEY).then(({ [NON_AUTO_KEY]: domainList }) => {
        if (!domainList || isEmpty(domainList)) domainList = []
        const domainIndex = domainList.indexOf(domain)
        if (checked && domainIndex !== -1) {
          domainList.splice(domainIndex, 1)
        }
        if (!checked && domainIndex === -1) {
          domainList.push(domain)
        }
        chrome.storage.sync.set({ [NON_AUTO_KEY]: domainList })
      })
      chrome.tabs.sendMessage(id, { greeting: 'toggle-enable', data: switchEle.checked })
    })
    .catch((e) => {
      console.log(e.message)
    })
})
