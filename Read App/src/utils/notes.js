import { getItem, setItem } from './storage.js'

const NOTES_KEY = 'notes'

export function getNotes() {
  return getItem(NOTES_KEY, [])
}

export function addNote(note) {
  const list = getNotes()
  const newNote = {
    id: String(Date.now()),
    createdAt: Date.now(),
    ...note,
  }
  list.unshift(newNote)
  setItem(NOTES_KEY, list)
  return newNote
}

export function exportNotesToText() {
  const list = getNotes()
  const lines = list.map((n) => {
    const time = new Date(n.createdAt).toLocaleString()
    const header = `[${time}] Book#${n.bookId || '-'} ${n.quote ? `\n> ${n.quote}` : ''}`
    const body = n.text ? `\n${n.text}` : ''
    return `${header}${body}`
  })
  return lines.join('\n\n---\n\n')
}


