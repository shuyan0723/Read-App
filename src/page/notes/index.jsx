import React, { useMemo, useState } from 'react'
import { exportNotesToText, getNotes } from '../../utils/notes.js'
import '../../styles/notes.css'; // 导入笔记样式

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
    <div className="notes-container">
      <h2 className="notes-title">笔记</h2>
      <div className="notes-controls">
        <input
          className="notes-search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索笔记..."
        />
        <button className="export-btn"
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
        <div className="empty-notes">暂无笔记</div>
      ) : (
        <ul className="notes-list">
          {filtered.map((n) => (
            <li key={n.id} className="note-item">
              <div className="note-meta">
                {new Date(n.createdAt).toLocaleString()} · 书籍 {n.bookId || '-'}
              </div>
              {n.quote && <blockquote className="note-quote">{n.quote}</blockquote>}
              {n.text && <div className="note-text">{n.text}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Notes