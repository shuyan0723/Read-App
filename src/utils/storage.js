const APP_PREFIX = 'read-app'
const STORAGE_VERSION = 'v1'

function makeKey(key) {
  return `${APP_PREFIX}:${STORAGE_VERSION}:${key}`
}

export function setItem(key, value) {
  try {
    const payload = { v: STORAGE_VERSION, t: Date.now(), d: value }
    localStorage.setItem(makeKey(key), JSON.stringify(payload))
    return true
  } catch {
    return false
  }
}

export function getItem(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(makeKey(key))
    if (!raw) return defaultValue
    const parsed = JSON.parse(raw)
    return parsed?.d ?? defaultValue
  } catch {
    return defaultValue
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(makeKey(key))
  } catch {
    // 忽略删除错误
  }
}

export function clearAll() {
  try {
    const prefix = `${APP_PREFIX}:${STORAGE_VERSION}:`
    for (let i = localStorage.length - 1; i >= 0; i -= 1) {
      const k = localStorage.key(i)
      if (k && k.startsWith(prefix)) localStorage.removeItem(k)
    }
  } catch {
    // 忽略清理错误
  }
}


