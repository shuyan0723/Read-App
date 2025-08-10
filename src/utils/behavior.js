import { getItem, setItem } from './storage.js'

const EVENTS_KEY = 'events'
const MAX_EVENTS = 500

export function logEvent(type, payload = {}) {
  try {
    const events = getItem(EVENTS_KEY, [])
    const entry = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      type,
      payload,
      ts: Date.now(),
    }
    const next = [...events, entry]
    if (next.length > MAX_EVENTS) next.splice(0, next.length - MAX_EVENTS)
    setItem(EVENTS_KEY, next)
  } catch {
    // ignore
  }
}

export function readEvents() {
  return getItem(EVENTS_KEY, [])
}

export function computePreferences() {
  const events = readEvents()
  const categoryScore = new Map()
  const authorScore = new Map()
  const WEIGHTS = { view: 1, preview: 2, add: 3, read: 4 }
  for (const e of events) {
    const t = e?.type
    const w = WEIGHTS[t] || 0.5
    const cat = e?.payload?.category
    const author = e?.payload?.author
    if (cat) categoryScore.set(cat, (categoryScore.get(cat) || 0) + w)
    if (author) authorScore.set(author, (authorScore.get(author) || 0) + w)
  }
  const topCategories = Array.from(categoryScore.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, score]) => ({ name, score }))
  const topAuthors = Array.from(authorScore.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, score]) => ({ name, score }))
  return { topCategories, topAuthors }
}


