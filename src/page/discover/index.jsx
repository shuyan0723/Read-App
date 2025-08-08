import React, { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { searchBooks, getRecommendedBooks, getPopularBooks } from '../../services/bookService.js'
import { useDebounce } from '../../hooks/useDebounce.js'

const Discover = () => {
  const [query, setQuery] = useState('')
  const [recommended, setRecommended] = useState([])
  const [popular, setPopular] = useState([])
  const debounced = useDebounce(query, 400)
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])

  // 加载推荐和热门书籍
  useEffect(() => {
    async function loadData() {
      try {
        const [recData, popData] = await Promise.all([
          getRecommendedBooks(),
          getPopularBooks(),
        ])
        const recList = Array.isArray(recData) ? recData : recData?.list || []
        const popList = Array.isArray(popData) ? popData : popData?.list || []
        setRecommended(recList)
        setPopular(popList)
      } catch (error) {
        console.error('加载推荐书籍失败:', error)
        setRecommended([])
        setPopular([])
      }
    }
    loadData()
  }, [])

  useMemo(() => {
    let cancelled = false
    async function run() {
      if (!debounced) {
        setList([])
        return
      }
      setLoading(true)
      try {
        const res = await searchBooks(debounced, 1, 20)
        const data = Array.isArray(res) ? res : res?.list || []
        if (!cancelled) setList(data)
      } catch (e) {
        if (!cancelled) setList([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [debounced])

  const renderBookList = (books, title, showCategory = false) => {
    const items = Array.isArray(books) ? books : books?.list || []
    return (
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>{title}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {items.map((b) => (
            <Link key={b.id} to={`/book/${b.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
                <img src={b.cover} alt={b.title} style={{ width: '100%', borderRadius: 6 }} />
                <div style={{ marginTop: 8, fontWeight: 600, fontSize: 14 }}>{b.title}</div>
                <div style={{ color: '#666', fontSize: 12 }}>{b.author}</div>
                {showCategory && <div style={{ color: '#999', fontSize: 10 }}>{b.category}</div>}
                <div style={{ color: '#f60', fontSize: 12 }}>评分 {b.rating}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <h2>发现</h2>
      
      {/* 搜索框 */}
      <div style={{ marginBottom: 16 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索书籍..."
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
        />
      </div>

      {/* 搜索结果 */}
      {query && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 12 }}>搜索结果</h3>
          {loading && <div>搜索中...</div>}
          {!loading && list.length === 0 && debounced && <div>没有找到结果</div>}
          {!loading && list.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {list.map((b) => (
                <Link key={b.id} to={`/book/${b.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
                    <img src={b.cover} alt={b.title} style={{ width: '100%', borderRadius: 6 }} />
                    <div style={{ marginTop: 8, fontWeight: 600, fontSize: 14 }}>{b.title}</div>
                    <div style={{ color: '#666', fontSize: 12 }}>{b.author}</div>
                    <div style={{ color: '#f60', fontSize: 12 }}>评分 {b.rating}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 推荐书籍 */}
      {!query && recommended.length > 0 && renderBookList(recommended, '为你推荐', true)}
      
      {/* 热门书籍 */}
      {!query && popular.length > 0 && renderBookList(popular, '热门书籍', true)}
    </div>
  )
}
export default Discover