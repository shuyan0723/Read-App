import { get } from './request.js'
import { mockBooks, generateMockBookList } from '../utils/mockData.js'

const isMock = String(import.meta.env.VITE_ENABLE_MOCK).toLowerCase() === 'true'

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// 书籍详情
export async function getBookById(bookId) {
  if (!bookId) throw new Error('bookId 不能为空')
  if (isMock) {
    await delay(300)
    // 先查找预定义的书籍
    const predefinedBook = mockBooks.find(b => b.id === bookId)
    if (predefinedBook) {
      return predefinedBook
    }
    // 如果没找到，生成一个
    return {
      id: String(bookId),
      title: `示例书籍 ${bookId}`,
      author: '示例作者',
      cover: `https://picsum.photos/seed/book_${bookId}/240/320`,
      rating: '4.3',
      summary: '这是一段示例书籍简介（Mock）。支持加入书架与开始阅读，阅读进度与笔记会持久化到本地。',
      category: '示例分类',
      publishYear: 2020,
    }
  }
  return get(`/books/${bookId}`)
}

// 搜索书籍
export async function searchBooks(query, page = 1, pageSize = 20) {
  if (!query) return { list: [], total: 0 }
  if (isMock) {
    await delay(200)
    const total = 42
    const start = (page - 1) * pageSize
    const end = Math.min(start + pageSize, total)
    
    // 如果有查询词，先尝试匹配预定义书籍
    const matchedPredefined = mockBooks.filter(b => 
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
    )
    
    let list = []
    if (matchedPredefined.length > 0) {
      list = matchedPredefined.slice(start, end)
    } else {
      // 生成随机书籍
      list = generateMockBookList(end - start, query)
    }
    
    return { list, total }
  }
  return get('/books/search', { params: { q: query, page, pageSize } })
}

// 获取推荐书籍
export async function getRecommendedBooks() {
  if (isMock) {
    await delay(150)
    return mockBooks.slice(0, 6)
  }
  return get('/books/recommended')
}

// 获取热门书籍
export async function getPopularBooks() {
  if (isMock) {
    await delay(200)
    return mockBooks.slice(0, 8)
  }
  return get('/books/popular')
}


