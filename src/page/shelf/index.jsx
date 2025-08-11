import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listByStatus, removeFromShelf, setStatus } from '../../utils/shelf.js'
import { resetMockData } from '../../utils/initMockData.js'
import { useDebounce } from '../../hooks/useDebounce.js'

// 添加到文件顶部导入样式文件
import './shelf-style.css';

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

  // 将书籍卡片组件定义移到 return 语句之前
  const BookCard = ({ book, activeTab, setStatus, removeFromShelf }) => {
    return (
      <div className="book-card">
        <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={book.cover} alt={book.title} className="book-cover" />
          <div className="book-title">{book.title}</div>
          <div className="book-author">{book.author} · {book.category}</div>
        </Link>
        <div className="book-actions">
          {activeTab === 'toRead' && (
            <button
              onClick={() => setStatus(book.id, 'reading')}
              className="action-button primary"
            >
              开始阅读
            </button>
          )}
          {activeTab === 'reading' && (
            <>
              <button
                onClick={() => setStatus(book.id, 'read')}
                className="action-button success"
              >
                标记已读
              </button>
              <button
                onClick={() => removeFromShelf(book.id)}
                className="action-button danger"
              >
                删除
              </button>
            </>
          )}
          {activeTab === 'read' && (
            <button
              onClick={() => removeFromShelf(book.id)}
              className="action-button danger"
            >
              删除
            </button>
          )}
        </div>
      </div>
    )
  }

  // 将返回部分修改为使用类名而不是内联样式
  return (
    <div className="shelf-container">
      <div className="shelf-header">
        <h2>我的书架</h2>
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
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
            style={{
              borderBottom: activeTab === tab.key ? `2px solid ${tab.color}` : '2px solid transparent',
              color: activeTab === tab.key ? tab.color : '#666',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
  
      {/* 搜索与开关 */}
      <div className="search-container">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索书名/作者/分类"
          className="search-input"
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
      <div className="categories-container">
        {categories.map((c) => (
          <button
            key={c}
            className={`btn ${activeCategory === c ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
  
      {/* 书籍列表 */}
      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          {activeTab === 'toRead' && '暂无待读书籍'}
          {activeTab === 'reading' && '暂无在读书籍'}
          {activeTab === 'read' && '暂无已读书籍'}
        </div>
      ) : (
        <>
          {groupByCategory && activeCategory === '全部' ? (
            <div className="grouped-books">
              {grouped.map(([cat, list]) => (
                <div key={cat} className="category-group">
                  <div className="category-title">{cat}（{list.length}）</div>
                  <div className="books-grid">
                    {list.map((book) => (
                      <BookCard key={book.id} book={book} activeTab={activeTab} setStatus={setStatus} removeFromShelf={removeFromShelf} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="books-grid">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} activeTab={activeTab} setStatus={setStatus} removeFromShelf={removeFromShelf} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Shelf
