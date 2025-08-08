import React from 'react'
import { getStats } from '../../utils/shelf.js'
import { getNotes } from '../../utils/notes.js'

const Me = () => {
  const stats = getStats()
  const notes = getNotes()
  return (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <h2>我的</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <div style={{ color: '#666' }}>待读</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{stats.toRead}</div>
        </div>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <div style={{ color: '#666' }}>在读</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{stats.reading}</div>
        </div>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <div style={{ color: '#666' }}>已读</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{stats.read}</div>
        </div>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <div style={{ color: '#666' }}>笔记条数</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{notes.length}</div>
        </div>
      </div>
    </div>
  )
}
export default Me