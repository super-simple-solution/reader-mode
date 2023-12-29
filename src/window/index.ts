import './index.scss'
import { getActiveTab } from '@/utils/extension-action'

const cancelEle = document.querySelector('.cancel-element')
cancelEle?.addEventListener('click', () => {
  // close window
  getActiveTab().then(({ windowId }) => chrome.windows.remove(windowId))
})
