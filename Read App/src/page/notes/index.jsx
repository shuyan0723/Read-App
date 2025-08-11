import React, { useMemo, useState } from 'react'
import { exportNotesToText, getNotes } from '../../utils/notes.js'

const Notes = () => {
  const [keyword, setKeyword] = useState('')
  const list = getNotes()
  const filtered = useMemo(() => {
    if (!keyword) return list
    const k = keyword.toLowerCase()
    return list.filter((n) =>
      [n.text, n.quote, n.bookId].filter(Boolean).some((t) => String(t).toLowerCase().includes(k)),
    )
  }, [keyword, list])

  return (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <h2>笔记</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索笔记..."
          style={{ flex: 1, padding: 8 }}
        />
        <button
          onClick={() => {
            const content = exportNotesToText()
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = 'notes.txt'
            a.click()
            URL.revokeObjectURL(a.href)
          }}
        >
          导出 TXT
        </button>
      </div>

      {filtered.length === 0 ? (
        <div>暂无笔记</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filtered.map((n) => (
            <li key={n.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: '#999' }}>
                {new Date(n.createdAt).toLocaleString()} · 书籍 {n.bookId || '-'}
              </div>
              {n.quote && <blockquote style={{ margin: '8px 0', color: '#555' }}>{n.quote}</blockquote>}
              {n.text && <div style={{ whiteSpace: 'pre-wrap' }}>{n.text}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default Notes