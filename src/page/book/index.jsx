import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBookById } from '../../services/bookService.js'
import { addToShelf, getStatus } from '../../utils/shelf.js'

const Book = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    let cancel = false
    async function run() {
      setLoading(true)
      try {
        const data = await getBookById(id)
        if (!cancel) setBook(data)
        if (!cancel) setStatus(getStatus(String(id)))
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
        <img src={book.cover} alt={book.title} style={{ width: 160, height: 'auto', borderRadius: 8 }} />
        <div>
          <h2 style={{ margin: '8px 0' }}>{book.title}</h2>
          <div style={{ color: '#666' }}>{book.author}</div>
          <div style={{ color: '#f60', marginTop: 4 }}>评分 {book.rating}</div>
          <p style={{ marginTop: 12, lineHeight: 1.6 }}>{book.summary}</p>
          <div style={{ marginTop: 16 }}>
            <button
              disabled={Boolean(status)}
              onClick={() => {
                addToShelf(book, 'toRead')
                setStatus('toRead')
              }}
            >
              {status ? '已在书架' : '加入书架（待读）'}
            </button>
            <button style={{ marginLeft: 8 }} onClick={() => navigate(`/read/${book.id}`)}>
              立即阅读
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book