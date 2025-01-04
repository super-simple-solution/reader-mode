import supabaseClient from '@/lib/supabase'
import { getActiveTab, initEventHandler } from '@/utils/extension-action'

function dbTable() {
  return supabaseClient.from('reader')
}

const contentReq = {
  'to-get-pattern': toGetPattern,
  'update-style': updateStyle,
}

function domainMatch(domain) {
  return (item) => domain === item || domain.endsWith(item)
}

function domainPropertyMatch(domain, isGeneric = false) {
  return (item) => {
    const curDomain = item.domain
    const res = domain === curDomain || domain.endsWith(curDomain)
    return isGeneric ? res || curDomain === '*' : res
  }
}

const SYNC_HOUR = 3
async function toGetPattern({ forceUpdate = false, domain = '' }, sendResponse) {
  let {
    pattern_list_updated_at,
    pattern_list: localPatternList,
    domain_list,
  } = await chrome.storage.local.get(['pattern_list_updated_at', 'pattern_list', 'domain_list'])
  localPatternList = localPatternList || []
  domain_list = domain_list || []
  const domainTarget = domain_list.find(domainMatch(domain))
  const domainPattern = localPatternList.find(domainPropertyMatch(domain))
  if (
    !forceUpdate &&
    localPatternList.length &&
    pattern_list_updated_at &&
    ((domainTarget && domainPattern) || !domainTarget) &&
    Date.now() - pattern_list_updated_at <= 1000 * 60 * 60 * SYNC_HOUR
  ) {
    if (!sendResponse) return
    sendResponse(domainPattern || localPatternList.find((item) => item.domain === '*'))
    return
  }
  const [{ data: patternList }, { data: domainList }] = await Promise.all([
    dbTable()
      .select('domain,selector')
      .in('domain', domain ? [domain, domain.match(/[^.]+\.\w+$/)[0], '*'] : ['*']),
    dbTable().select('domain'),
  ])
  if (sendResponse) {
    sendResponse((patternList || []).find(domainPropertyMatch(domain, true)))
  }
  chrome.storage.local.set({
    pattern_list: patternList,
    domain_list: (domainList || []).map((item) => item.domain),
    pattern_list_updated_at: Date.now(),
  })
}

function refreshPattern() {
  toGetPattern({ forceUpdate: true })
}

chrome.runtime.onInstalled.addListener(refreshPattern)

function updateStyle(data) {
  console.debug(data, 'data')
  getActiveTab().then((tab) => {
    console.debug(tab, 'tab')
    chrome.tabs.sendMessage(tab.id, { greeting: 'update-style', data })
  })
  // chrome.storage.sync.set({ style: data }, () => {
  //   getActiveTab().then((tab) => {
  //     chrome.tabs.sendMessage(tab.id, { greeting: 'update-style', data })
  //   })
  // })
}

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url === 'chrome://extensions/') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'assets/icons/128.png',
      title: 'readerMode',
      message: '请在网页上使用',
    })
    return
  }
  try {
    // 当用户点击扩展图标时，尝试打开侧边栏
    await chrome.sidePanel.open({ windowId: tab.windowId })
  } catch (error) {
    console.error('Error opening side panel:', error)
  }
})

initEventHandler(contentReq)
