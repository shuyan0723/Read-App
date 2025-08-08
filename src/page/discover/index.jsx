import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchBooks } from '../../services/bookService.js'
import { useDebounce } from '../../hooks/useDebounce.js'

const Discover = () => {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 400)
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])

  useMemo(() => {
    let cancelled = false
    async function run() {
      if (!debounced) {
        setList([])
        return
      }
      setLoading(true)
      try {
        const { list: data } = await searchBooks(debounced, 1, 20)
        if (!cancelled) setList(data)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [debounced])

  return (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <h2>发现</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索书籍..."
        style={{ width: '100%', padding: 8, marginBottom: 12 }}
      />
      {loading && <div>搜索中...</div>}
      {!loading && list.length === 0 && debounced && <div>没有找到结果</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {list.map((b) => (
          <Link key={b.id} to={`/book/${b.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
              <img src={b.cover} alt={b.title} style={{ width: '100%', borderRadius: 6 }} />
              <div style={{ marginTop: 8, fontWeight: 600 }}>{b.title}</div>
              <div style={{ color: '#666', fontSize: 12 }}>{b.author}</div>
              <div style={{ color: '#f60', fontSize: 12 }}>评分 {b.rating}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default Discover