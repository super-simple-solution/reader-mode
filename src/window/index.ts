import './index.scss'
import { getActiveTab } from '@/utils/extension-action'

const cancelEle = document.getElementById('cancel')
const previewEle = document.getElementById('preview')
const unselectEle = document.getElementById('unselect')

cancelEle?.addEventListener('click', () => {
  // close window
  getActiveTab().then(({ windowId }) => chrome.windows.remove(windowId))
})

unselectEle?.addEventListener('click', () => {
  console.log('unselect')
})

previewEle?.addEventListener('click', () => {
  const previewData = previewEle.getAttribute('data-preview')
  if (previewData === 'inactive') {
    previewEle.textContent = 'Exit Preview'
    previewEle.setAttribute('data-preview', 'active')
    getActiveTab({ currentWindow: false }).then(({ id }) => chrome.tabs.sendMessage(id, { greeting: 'to-preview' }))
  } else {
    previewEle.textContent = 'Preview'
    previewEle.setAttribute('data-preview', 'inactive')
    getActiveTab({ currentWindow: false }).then(({ id }) =>
      chrome.tabs.sendMessage(id, { greeting: 'to-exit-preview' }),
    )
  }
})
