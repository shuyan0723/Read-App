import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBookById } from '../../services/bookService.js'
import { addToShelf, getStatus } from '../../utils/shelf.js'
import { searchBooks } from '../../services/bookService.js'
import { logEvent } from '../../utils/behavior.js'

const Book = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)
  const [related, setRelated] = useState([])

  useEffect(() => {
    let cancel = false
    async function run() {
      setLoading(true)
      try {
        const data = await getBookById(id)
        if (!cancel) setBook(data)
        if (!cancel) setStatus(getStatus(String(id)))
        // 智能关联推荐：基于分类与作者进行一次搜索
        try {
          const q = `${data.category || ''} ${data.author || ''}`.trim()
          if (q) {
            const res = await searchBooks(q, 1, 6)
            const list = Array.isArray(res) ? res : res?.list || []
            if (!cancel) setRelated(list.filter((b) => String(b.id) !== String(id)))
          }
        } catch {}
      } finally {
        if (!cancel) setLoading(false)
      }
    }
    run()
    return () => {
      cancel = true
    }
  }, [id])

  if (loading) return <div style={{ padding: 16 }}>加载中...</div>
  if (!book) return <div style={{ padding: 16 }}>未找到该书籍</div>

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>
        返回
      </button>
      <div style={{ display: 'flex', gap: 16 }}>
        <img src={book.cover} alt={book.title} style={{ width: 180, height: 'auto', borderRadius: 8 }} />
        <div>
          <h2 style={{ margin: '8px 0' }}>{book.title}</h2>
          <div style={{ color: '#666' }}>{book.author}</div>
          <div style={{ color: '#f60', marginTop: 4 }}>评分 {book.rating}</div>
          <p style={{ marginTop: 12, lineHeight: 1.8 }}>{book.summary}</p>
          <div style={{ marginTop: 16 }}>
            <button
              disabled={Boolean(status)}
              onClick={() => {
                addToShelf(book, 'toRead')
                setStatus('toRead')
                try { logEvent('add', { bookId: String(book.id), category: book.category, author: book.author }) } catch {}
              }}
            >
              {status ? '已在书架' : '加入书架（待读）'}
            </button>
            <button style={{ marginLeft: 8 }} onClick={() => {
              try { logEvent('read', { bookId: String(book.id), category: book.category, author: book.author }) } catch {}
              navigate(`/read/${book.id}`)
            }}>
              试读
            </button>
          </div>
        </div>
      </div>

      {/* 关联推荐 */}
      {related.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ marginBottom: 12 }}>你可能还喜欢</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {related.map((b) => (
              <div key={b.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
                <img src={b.cover} alt={b.title} style={{ width: '100%', borderRadius: 6 }} />
                <div style={{ marginTop: 6, fontWeight: 600, fontSize: 13 }}>{b.title}</div>
                <div style={{ color: '#666', fontSize: 12 }}>{b.author}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Book