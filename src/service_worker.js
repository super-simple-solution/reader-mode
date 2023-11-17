import { initEventHandler } from '@/utils/extension-action'
import supabaseClient from '@/lib/supabase'

function dbTable() {
  return supabaseClient.from('reader')
}

const contentReq = {
  'to-get-pattern': toGetPattern,
  'to-save-detect-ele': toSaveDetectEle,
}

const SYNC_HOUR = 3
async function toGetPattern({ forceUpdate = false, domain }, sendResponse) {
  let {
    pattern_list_updated_at,
    pattern_list: localPatternList,
    domain_list,
  } = await chrome.storage.local.get(['pattern_list_updated_at', 'pattern_list', 'domain_list'])
  localPatternList = localPatternList || []
  domain_list = domain_list || []
  const domainTarget = domain_list.find((item) => item === domain)
  const domainPattern = localPatternList.find((item) => item.domain === domain)
  if (
    !forceUpdate &&
    localPatternList.length &&
    pattern_list_updated_at &&
    ((domainTarget && domainPattern) || !domainTarget) &&
    Date.now() - pattern_list_updated_at <= 1000 * 60 * 60 * SYNC_HOUR
  ) {
    if (!sendResponse || !domainPattern) return
    sendResponse(domainPattern)
    return
  }
  const [{ data: patternList }, { data: domainList }] = await Promise.all([
    dbTable()
      .select('domain,selector')
      .in('domain', domain ? [domain, '*'] : ['*']),
    dbTable().select('domain'),
  ])
  sendResponse && sendResponse(patternList.find((item) => item.domain === domain || '*'))
  chrome.storage.local.set({
    pattern_list: patternList,
    domain_list: domainList.map((item) => item.domain),
    pattern_list_updated_at: Date.now(),
  })
}

async function toSaveDetectEle(params, sendResponse) {
  const paginationRes = await dbTable().select('domain').eq('domain', params.domain)
  if (paginationRes.data.length) {
    const { data } = await dbTable().update(params).eq('domain', params.domain).select()
    sendResponse && sendResponse(data[0])
    refreshPattern()
  } else {
    const { data } = await dbTable().insert(params).select()
    sendResponse && sendResponse(data[0])
    refreshPattern()
  }
}

function refreshPattern() {
  toGetPattern({ forceUpdate: true })
}

chrome.runtime.onInstalled.addListener(refreshPattern)

initEventHandler(contentReq)
