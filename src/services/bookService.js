import { get } from './request.js'

const isMock = String(import.meta.env.VITE_ENABLE_MOCK).toLowerCase() === 'true'

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function generateMockList(query, page, pageSize) {
  const total = 42
  const start = (page - 1) * pageSize
  const end = Math.min(start + pageSize, total)
  const list = Array.from({ length: Math.max(0, end - start) }, (_, i) => {
    const id = start + i + 1
    return {
      id: String(id),
      title: `${query || '书籍'} ${id}`,
      author: `作者 ${((id % 7) + 1)}`,
      cover: `https://picsum.photos/seed/book_${id}/120/160`,
      rating: (Math.random() * 3 + 2).toFixed(1),
      summary: '这是一段用于展示的书籍简介（Mock）。',
    }
  })
  return { list, total }
}

// 书籍详情
export async function getBookById(bookId) {
  if (!bookId) throw new Error('bookId 不能为空')
  if (isMock) {
    await delay(300)
    return {
      id: String(bookId),
      title: `示例书籍 ${bookId}`,
      author: '示例作者',
      cover: `https://picsum.photos/seed/book_${bookId}/240/320`,
      rating: '4.3',
      summary:
        '这是一段示例书籍简介（Mock）。支持加入书架与开始阅读，阅读进度与笔记会持久化到本地。',
    }
  }
  return get(`/books/${bookId}`)
}

// 搜索书籍
export async function searchBooks(query, page = 1, pageSize = 20) {
  if (!query) return { list: [], total: 0 }
  if (isMock) {
    await delay(200)
    return generateMockList(query, page, pageSize)
  }
  return get('/books/search', { params: { q: query, page, pageSize } })
}


