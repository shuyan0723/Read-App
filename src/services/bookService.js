import { get } from './request.js'
import { mockBooks, generateMockBookList } from '../utils/mockData.js'
import { computePreferences } from '../utils/behavior.js'
import { MAIN_CATEGORIES } from '../utils/categories.js'

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
export async function getRecommendedBooks(count = 6) {
  if (isMock) {
    await delay(150)
    const base = mockBooks.slice(0, count)
    if (base.length < count) {
      const more = generateMockBookList(count - base.length)
      return [...base, ...more]
    }
    return base
  }
  return get('/books/recommended', { params: { count } })
}

// 获取热门书籍
export async function getPopularBooks(count = 8) {
  if (isMock) {
    await delay(200)
    const pool = [...mockBooks, ...generateMockBookList(count * 2)]
    // 简单按评分排序模拟“热门”
    return pool
      .map((b) => ({ ...b, _r: parseFloat(b.rating || '0') }))
      .sort((a, b) => b._r - a._r)
      .slice(0, count)
      .map(({ _r, ...rest }) => rest)
  }
  return get('/books/popular', { params: { count } })
}

// 获取高分排行
export async function getTopRatedBooks(count = 10) {
  if (isMock) {
    await delay(150)
    const parsed = mockBooks
      .map((b) => ({ ...b, _r: parseFloat(b.rating || '0') }))
      .sort((a, b) => b._r - a._r)
      .slice(0, count)
      .map(({ _r, ...rest }) => rest)
    if (parsed.length < count) {
      const extra = generateMockBookList(count * 2)
        .map((b) => ({ ...b, _r: parseFloat(b.rating || '0') }))
        .sort((a, b) => b._r - a._r)
        .slice(0, count - parsed.length)
        .map(({ _r, ...rest }) => rest)
      return [...parsed, ...extra]
    }
    return parsed
  }
  return get('/books/top-rated', { params: { count } })
}

// 按分类获取书籍
export async function getBooksByCategory(category, count = 8) {
  if (!category) return []
  if (isMock) {
    await delay(120)
    const fromPredefined = mockBooks.filter((b) => b.category === category)
    if (fromPredefined.length >= count) return fromPredefined.slice(0, count)
    const generated = generateMockBookList(count * 3).filter((b) => b.category === category)
    return [...fromPredefined, ...generated].slice(0, count)
  }
  return get('/books/by-category', { params: { category, count } })
}

// 时间热度排行（综合评分与近年加权）
export async function getTrendingBooks(count = 8) {
  if (isMock) {
    await delay(150)
    const year = new Date().getFullYear()
    const pool = [...mockBooks, ...generateMockBookList(count * 3)]
    const scored = pool.map((b) => {
      const rating = parseFloat(b.rating || '0')
      const recency = Math.max(0, 15 - Math.abs((b.publishYear || year) - year)) / 15
      const score = rating * 0.7 + recency * 3 + Math.random() * 0.5
      return { ...b, _s: score }
    })
    return scored.sort((a, b) => b._s - a._s).slice(0, count).map(({ _s, ...rest }) => rest)
  }
  return get('/books/trending', { params: { count } })
}

// 最近上架（按出版年倒序模拟）
export async function getRecentlyAddedBooks(count = 8) {
  if (isMock) {
    await delay(120)
    const pool = [...mockBooks, ...generateMockBookList(count * 3)]
    return pool.sort((a, b) => (b.publishYear || 0) - (a.publishYear || 0)).slice(0, count)
  }
  return get('/books/recent', { params: { count } })
}

// 每周新书（基于“最近上架”变化模拟）
export async function getWeeklyNewBooks(count = 10) {
  if (isMock) {
    await delay(120)
    const base = await getRecentlyAddedBooks(count * 2)
    return base.slice(0, count)
  }
  return get('/books/weekly-new', { params: { count } })
}

// 本月编辑推荐（在编辑精选基础上增加数量）
export async function getMonthlyEditorPicks(count = 12) {
  if (isMock) {
    return getEditorPicks(count)
  }
  return get('/books/monthly-editor-picks', { params: { count } })
}

// 个性化推荐（基于行为偏好）
export async function getPersonalizedRecommendations(count = 12) {
  if (isMock) {
    await delay(160)
    const pref = computePreferences()
    const pool = [...mockBooks, ...generateMockBookList(count * 6)]
    const scored = pool.map((b) => {
      const rating = parseFloat(b.rating || '0')
      const catBoost = (pref.topCategories.find((c) => c.name === b.category)?.score || 0) * 0.2
      const authorBoost = (pref.topAuthors.find((a) => a.name === b.author)?.score || 0) * 0.3
      const score = rating * 0.7 + catBoost + authorBoost + Math.random() * 0.2
      return { ...b, _s: score }
    })
    return scored.sort((a, b) => b._s - a._s).slice(0, count).map(({ _s, ...rest }) => rest)
  }
  return get('/books/personalized', { params: { count } })
}

// 编辑精选（简单按评分+随机权重模拟编辑挑选）
export async function getEditorPicks(count = 8) {
  if (isMock) {
    await delay(140)
    const pool = [...mockBooks, ...generateMockBookList(count * 3)]
    const scored = pool.map((b) => ({
      ...b,
      _s: parseFloat(b.rating || '0') * 0.8 + Math.random() * 2,
    }))
    return scored.sort((a, b) => b._s - a._s).slice(0, count).map(({ _s, ...rest }) => rest)
  }
  return get('/books/editor-picks', { params: { count } })
}

// 热门阅读（按“热门”近似，使用 getPopularBooks 的逻辑）
export async function getHotReading(count = 8) {
  if (isMock) {
    return getPopularBooks(count)
  }
  return get('/books/hot-reading', { params: { count } })
}

// 阅读榜单（以“阅读量”模拟）
export async function getReadingLeaderboard(count = 8) {
  if (isMock) {
    await delay(160)
    const pool = [...mockBooks, ...generateMockBookList(count * 4)]
    const withReads = pool.map((b) => ({
      ...b,
      _reads: Math.floor(Math.random() * 5000) + Math.floor(parseFloat(b.rating || '0') * 300),
    }))
    return withReads.sort((a, b) => b._reads - a._reads).slice(0, count).map(({ _reads, ...rest }) => rest)
  }
  return get('/books/reading-leaderboard', { params: { count } })
}

// 子分类：经典著作 / 当代作品（通过出版年阈值模拟）
export async function getBooksBySubcategory(category, subcategory, count = 8) {
  if (!category || !subcategory) return []
  if (isMock) {
    await delay(120)
    const yearThreshold = 1980
    const pool = [...mockBooks, ...generateMockBookList(count * 5)]
    const filtered = pool.filter((b) => b.category === category)
    const isClassic = subcategory === '经典著作'
    const picked = filtered.filter((b) => {
      const y = b.publishYear || 0
      return isClassic ? y <= yearThreshold : y > yearThreshold
    })
    return picked.slice(0, count)
  }
  return get('/books/by-subcategory', { params: { category, subcategory, count } })
}

// 读者好评（按分类高分）
export async function getTopRatedByCategory(category, count = 8) {
  if (!category) return []
  if (isMock) {
    await delay(150)
    const pool = [...mockBooks, ...generateMockBookList(count * 4)]
    const filtered = pool.filter((b) => b.category === category)
    return filtered
      .map((b) => ({ ...b, _r: parseFloat(b.rating || '0') }))
      .sort((a, b) => b._r - a._r)
      .slice(0, count)
      .map(({ _r, ...rest }) => rest)
  }
  return get('/books/top-rated/by-category', { params: { category, count } })
}

// 主题书单（同类关键词聚合，Mock 用子分类聚合）
export async function getThematicCollections(category, count = 8) {
  if (isMock) {
    await delay(140)
    const cat = MAIN_CATEGORIES.find((c) => c.name === category)
    const subs = cat?.subcategories || []
    const items = subs.slice(0, 3).map((name, idx) => ({ id: `${category}-${idx}`, title: `${category} · ${name} 主题书单` }))
    return items
  }
  return get('/books/thematic-collections', { params: { category, count } })
}

// 跨品类推荐（取相邻主分类各若干高分）
export async function getCrossCategoryRecommendations(category, countPerCat = 4) {
  if (isMock) {
    await delay(160)
    const pool = [...mockBooks, ...generateMockBookList(countPerCat * 8)]
    const cats = Array.from(new Set(pool.map((b) => b.category))).filter((c) => c && c !== category)
    const pickFrom = cats.slice(0, 3)
    const result = []
    pickFrom.forEach((c) => {
      const top = pool
        .filter((b) => b.category === c)
        .map((b) => ({ ...b, _r: parseFloat(b.rating || '0') }))
        .sort((a, b) => b._r - a._r)
        .slice(0, countPerCat)
        .map(({ _r, ...rest }) => rest)
      result.push({ category: c, list: top })
    })
    return result
  }
  return get('/books/cross-category', { params: { category, countPerCat } })
}


