import { getItem, setItem } from './storage.js'

const SHELF_KEY = 'shelf'

export function getShelf() {
  return getItem(SHELF_KEY, {})
}

export function saveShelf(shelf) {
  setItem(SHELF_KEY, shelf)
}

export function addToShelf(book, status = 'toRead') {
  const shelf = getShelf()
  shelf[book.id] = { status, book }
  saveShelf(shelf)
}

export function removeFromShelf(bookId) {
  const shelf = getShelf()
  delete shelf[bookId]
  saveShelf(shelf)
}

export function setStatus(bookId, status) {
  const shelf = getShelf()
  if (shelf[bookId]) {
    shelf[bookId].status = status
    saveShelf(shelf)
  }
}

export function getStatus(bookId) {
  const shelf = getShelf()
  return shelf[bookId]?.status || null
}

export function listByStatus(status) {
  const shelf = getShelf()
  return Object.values(shelf)
    .filter((x) => x.status === status)
    .map((x) => x.book)
}

export function getStats() {
  const shelf = getShelf()
  const stats = { reading: 0, read: 0, toRead: 0, total: 0 }
  Object.values(shelf).forEach((x) => {
    if (x?.status && stats[x.status] !== undefined) stats[x.status] += 1
  })
  stats.total = Object.keys(shelf).length
  return stats
}


