import './style.scss'
import { getActiveTabId } from '@/utils/extension-action'

const detectEle = document.querySelector('.detect')
const switchEle = document.getElementById('switch') as HTMLInputElement
detectEle?.addEventListener('click', () => {
  // if ((e.target as Element).className !== 'btn') return
  getActiveTabId().then((tabId) => chrome.tabs.sendMessage(tabId, { action: 'to-detect' }))
})

switchEle?.addEventListener('change', () => {
  getActiveTabId().then((tabId) => {
    chrome.tabs.sendMessage(tabId, { action: 'toggle-enable', data: switchEle.checked })
  })
})
