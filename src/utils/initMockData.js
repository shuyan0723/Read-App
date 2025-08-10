import { mockShelf, mockNotes, mockReadingProgress, generateMockBookList } from './mockData.js'
import { saveShelf } from './shelf.js'
import { getNotes, addNote } from './notes.js'
import { setItem } from './storage.js'

// 初始化Mock数据
export function initMockData() {
  // 检查是否已经初始化过
  const isInitialized = localStorage.getItem('read-app:mock-initialized')
  if (isInitialized) {
    return
  }

  try {
    // 初始化书架数据（扩充多分类与更多书籍）
    const baseShelf = { ...mockShelf }
    const extraBooks = generateMockBookList(24)
      .map((b, idx) => ({
        ...b,
        id: `g${idx + 1}`,
        cover: `https://picsum.photos/seed/book_g${idx + 1}/120/160`,
      }))

    const statusPool = ['toRead', 'reading', 'read']
    const extraShelfEntries = Object.fromEntries(
      extraBooks.map((book, i) => [book.id, { status: statusPool[i % statusPool.length], book }]),
    )

    saveShelf({ ...baseShelf, ...extraShelfEntries })
    
    // 初始化笔记数据
    const existingNotes = getNotes()
    if (existingNotes.length === 0) {
      mockNotes.forEach(note => {
        addNote({
          bookId: note.bookId,
          bookTitle: note.bookTitle,
          quote: note.quote,
          text: note.text,
          chapter: note.chapter,
          page: note.page,
        })
      })
    }
    
    // 初始化阅读进度
    Object.entries(mockReadingProgress).forEach(([bookId, progress]) => {
      setItem(`progress:${bookId}`, progress.progress)
    })
    
    // 标记已初始化
    localStorage.setItem('read-app:mock-initialized', 'true')
    
    console.log('Mock数据初始化完成')
  } catch (error) {
    console.error('初始化Mock数据失败:', error)
  }
}

// 清除Mock数据
export function clearMockData() {
  try {
    // 清除书架
    localStorage.removeItem('read-app:v1:shelf')
    
    // 清除笔记
    localStorage.removeItem('read-app:v1:notes')
    
    // 清除阅读进度
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('read-app:v1:progress:')) {
        localStorage.removeItem(key)
      }
    })
    
    // 清除初始化标记
    localStorage.removeItem('read-app:mock-initialized')
    
    console.log('Mock数据已清除')
  } catch (error) {
    console.error('清除Mock数据失败:', error)
  }
}

// 重置Mock数据
export function resetMockData() {
  clearMockData()
  initMockData()
}
