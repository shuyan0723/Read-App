import React from 'react'
import { getStats } from '../../utils/shelf.js'
import { getNotes } from '../../utils/notes.js'
import { generateReadingStats } from '../../utils/mockData.js'

const Me = () => {
  const stats = getStats()
  const notes = getNotes()
  const readingStats = generateReadingStats()
  
  return (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <h2>我的</h2>
      
      {/* 用户信息 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: 16, 
        backgroundColor: '#f8f9fa', 
        borderRadius: 8, 
        marginBottom: 16 
      }}>
        <img 
          src="https://picsum.photos/seed/user_001/80/80" 
          alt="头像" 
          style={{ 
            width: 60, 
            height: 60, 
            borderRadius: '50%', 
            marginRight: 12 
          }} 
        />
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>阅读爱好者</div>
          <div style={{ color: '#666', fontSize: 14 }}>已加入 7 个月</div>
        </div>
      </div>
      
      {/* 阅读统计 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <div style={{ color: '#666', fontSize: 12 }}>总阅读时长</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#007aff' }}>
            {Math.floor(readingStats.totalReadTime / 60)}小时
          </div>
        </div>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <div style={{ color: '#666', fontSize: 12 }}>连续阅读</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#ff9500' }}>
            {readingStats.currentStreak}天
          </div>
        </div>
      </div>
      
      {/* 书架统计 */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 8 }}>书架统计</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
            <div style={{ color: '#666', fontSize: 12 }}>待读</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#007aff' }}>{stats.toRead}</div>
          </div>
          <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
            <div style={{ color: '#666', fontSize: 12 }}>在读</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#ff9500' }}>{stats.reading}</div>
          </div>
          <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
            <div style={{ color: '#666', fontSize: 12 }}>已读</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#34c759' }}>{stats.read}</div>
          </div>
        </div>
      </div>
      
      {/* 其他统计 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <div style={{ color: '#666', fontSize: 12 }}>笔记条数</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{notes.length}</div>
        </div>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <div style={{ color: '#666', fontSize: 12 }}>本月目标</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#ff3b30' }}>
            {readingStats.monthlyRead}/{readingStats.monthlyGoal}
          </div>
        </div>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <div style={{ color: '#666', fontSize: 12 }}>最爱分类</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{readingStats.favoriteCategory}</div>
        </div>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <div style={{ color: '#666', fontSize: 12 }}>平均评分</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#f60' }}>{readingStats.averageRating}</div>
        </div>
      </div>
    </div>
  )
}
export default Me