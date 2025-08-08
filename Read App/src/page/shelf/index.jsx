import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { listByStatus, removeFromShelf, setStatus } from '../../utils/shelf.js'

const Shelf = () => {
  const [activeTab, setActiveTab] = useState('toRead')
  const tabs = [
    { key: 'toRead', label: '待读', color: '#007aff' },
    { key: 'reading', label: '在读', color: '#ff9500' },
    { key: 'read', label: '已读', color: '#34c759' },
  ]

  const books = listByStatus(activeTab)

  return (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <h2>我的书架</h2>
      
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

      {/* 书籍列表 */}
      {books.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#999', marginTop: 40 }}>
          {activeTab === 'toRead' && '暂无待读书籍'}
          {activeTab === 'reading' && '暂无在读书籍'}
          {activeTab === 'read' && '暂无已读书籍'}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {books.map((book) => (
            <div key={book.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
              <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={book.cover} alt={book.title} style={{ width: '100%', borderRadius: 6 }} />
                <div style={{ marginTop: 8, fontWeight: 600 }}>{book.title}</div>
                <div style={{ color: '#666', fontSize: 12 }}>{book.author}</div>
              </Link>
              
              {/* 操作按钮 */}
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
    </div>
  )
}

export default Shelf
