import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listByStatus, removeFromShelf, setStatus } from '../../utils/shelf.js'
import { resetMockData } from '../../utils/initMockData.js'
import { useDebounce } from '../../hooks/useDebounce.js'

const Shelf = () => {
  const [activeTab, setActiveTab] = useState('toRead')
  const tabs = [
    { key: 'toRead', label: '待读', color: '#007aff' },
    { key: 'reading', label: '在读', color: '#ff9500' },
    { key: 'read', label: '已读', color: '#34c759' },
  ]

  const books = listByStatus(activeTab)

  // 分类筛选与分组
  const [activeCategory, setActiveCategory] = useState('全部')
  const [groupByCategory, setGroupByCategory] = useState(true)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const categories = useMemo(() => {
    const set = new Set(['全部'])
    books.forEach((b) => b.category && set.add(b.category))
    return Array.from(set)
  }, [books])

  const filteredBooks = useMemo(() => {
    const base = activeCategory === '全部' ? books : books.filter((b) => b.category === activeCategory)
    const q = debouncedSearch.trim().toLowerCase()
    if (!q) return base
    return base.filter((b) =>
      [b.title, b.author, b.category].some((t) => String(t || '').toLowerCase().includes(q)),
    )
  }, [books, activeCategory, debouncedSearch])

  const grouped = useMemo(() => {
    const m = new Map()
    filteredBooks.forEach((b) => {
      const key = b.category || '未分类'
      if (!m.has(key)) m.set(key, [])
      m.get(key).push(b)
    })
    return Array.from(m.entries()) // [category, books[]]
  }, [filteredBooks])

  return (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>我的书架</h2>
        <button
          className="btn btn-outline"
          onClick={() => {
            try {
              resetMockData()
            } catch {}
            window.location.reload()
          }}
        >
          重置模拟数据
        </button>
      </div>
      
      {/* 标签页 */}
      <div style={{ display: 'flex', marginBottom: 16, borderBottom: '1px solid #eee' }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              padding: '12px 8px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === tab.key ? `2px solid ${tab.color}` : '2px solid transparent',
              color: activeTab === tab.key ? tab.color : '#666',
              fontWeight: activeTab === tab.key ? 600 : 400,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 搜索与开关 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '12px 0' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索书名/作者/分类"
          style={{
            flex: 1,
            padding: '10px 12px',
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text)',
          }}
        />
        <button
          className={`btn ${groupByCategory ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setGroupByCategory((v) => !v)}
          title="切换分组视图"
        >
          {groupByCategory ? '按分类分组' : '不分组'}
        </button>
      </div>

      {/* 分类筛选 */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 8 }}>
        {categories.map((c) => (
          <button
            key={c}
            className={`btn ${activeCategory === c ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveCategory(c)}
            style={{ whiteSpace: 'nowrap' }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 书籍列表 */}
      {filteredBooks.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#999', marginTop: 40 }}>
          {activeTab === 'toRead' && '暂无待读书籍'}
          {activeTab === 'reading' && '暂无在读书籍'}
          {activeTab === 'read' && '暂无已读书籍'}
        </div>
      ) : (
        <>
          {groupByCategory && activeCategory === '全部' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {grouped.map(([cat, list]) => (
                <div key={cat}>
                  <div style={{
                    fontSize: 14,
                    color: 'var(--muted)',
                    margin: '6px 2px 8px',
                    fontWeight: 600,
                  }}>{cat}（{list.length}）</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                    {list.map((book) => (
                      <div key={book.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
                        <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <img src={book.cover} alt={book.title} style={{ width: '100%', borderRadius: 6 }} />
                          <div style={{ marginTop: 8, fontWeight: 600 }}>{book.title}</div>
                          <div style={{ color: '#666', fontSize: 12 }}>{book.author} · {book.category}</div>
                        </Link>
                        <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                          {activeTab === 'toRead' && (
                            <button
                              onClick={() => setStatus(book.id, 'reading')}
                              style={{ flex: 1, padding: '4px 8px', fontSize: 12, background: '#007aff', color: 'white', border: 'none', borderRadius: 4 }}
                            >
                              开始阅读
                            </button>
                          )}
                          {activeTab === 'reading' && (
                            <>
                              <button
                                onClick={() => setStatus(book.id, 'read')}
                                style={{ flex: 1, padding: '4px 8px', fontSize: 12, background: '#34c759', color: 'white', border: 'none', borderRadius: 4 }}
                              >
                                标记已读
                              </button>
                              <button
                                onClick={() => removeFromShelf(book.id)}
                                style={{ padding: '4px 8px', fontSize: 12, background: '#ff3b30', color: 'white', border: 'none', borderRadius: 4 }}
                              >
                                删除
                              </button>
                            </>
                          )}
                          {activeTab === 'read' && (
                            <button
                              onClick={() => removeFromShelf(book.id)}
                              style={{ flex: 1, padding: '4px 8px', fontSize: 12, background: '#ff3b30', color: 'white', border: 'none', borderRadius: 4 }}
                            >
                              删除
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {filteredBooks.map((book) => (
                <div key={book.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
                  <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src={book.cover} alt={book.title} style={{ width: '100%', borderRadius: 6 }} />
                    <div style={{ marginTop: 8, fontWeight: 600 }}>{book.title}</div>
                    <div style={{ color: '#666', fontSize: 12 }}>{book.author} · {book.category}</div>
                  </Link>
                  <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                    {activeTab === 'toRead' && (
                      <button
                        onClick={() => setStatus(book.id, 'reading')}
                        style={{ flex: 1, padding: '4px 8px', fontSize: 12, background: '#007aff', color: 'white', border: 'none', borderRadius: 4 }}
                      >
                        开始阅读
                      </button>
                    )}
                    {activeTab === 'reading' && (
                      <>
                        <button
                          onClick={() => setStatus(book.id, 'read')}
                          style={{ flex: 1, padding: '4px 8px', fontSize: 12, background: '#34c759', color: 'white', border: 'none', borderRadius: 4 }}
                        >
                          标记已读
                        </button>
                        <button
                          onClick={() => removeFromShelf(book.id)}
                          style={{ padding: '4px 8px', fontSize: 12, background: '#ff3b30', color: 'white', border: 'none', borderRadius: 4 }}
                        >
                          删除
                        </button>
                      </>
                    )}
                    {activeTab === 'read' && (
                      <button
                        onClick={() => removeFromShelf(book.id)}
                        style={{ flex: 1, padding: '4px 8px', fontSize: 12, background: '#ff3b30', color: 'white', border: 'none', borderRadius: 4 }}
                      >
                        删除
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Shelf
