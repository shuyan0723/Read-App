import React from 'react'
import { getStats } from '../../utils/shelf.js'
import { getNotes } from '../../utils/notes.js'
import { generateReadingStats } from '../../utils/mockData.js'
import './style.css'

const Me = () => {
  const stats = getStats()
  const notes = getNotes()
  const readingStats = generateReadingStats()
  
  return (
    <div className="me-container" style={{ padding: 16, paddingBottom: 60 }}>
      {/* <h2 className="me-title">我的书房</h2> */}
      
      {/* 用户信息 */}
      <div className="user-card">
        <img 
          src="https://picsum.photos/seed/user_001/80/80"
          alt="头像"
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            marginRight: 16,
            border: '3px solid #f0e6d2',
            boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
          }} 
        />
        <div>
          <div className="user-name">韩非子</div>
          <div style={{ color: '#ff9500', fontSize: 14, margin: '4px 0' }}>
            <span style={{ backgroundColor: '#c2a97e', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: 12, marginRight: 6 }}>LV.5</span>
            阅读爱好者
          </div>
          <div style={{ color: '#666', fontSize: 14 }}>已加入 7 个月</div>
          <div style={{ color: '#5d4037', fontSize: 14, marginTop: 8, fontStyle: 'italic' }}>个性签名: 读万卷书，行万里路</div>
        </div>
      </div>
      
      <div className="divider"></div>
      
      {/* 阅读统计 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16}}>
        <div className="stats-card">
          <div className="stats-title">总阅读时长</div>
          <div className="stats-value" style={{ color: '#8b5a2b' }}>
            {Math.floor(readingStats.totalReadTime / 60)}小时
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-title">连续阅读</div>
          <div className="stats-value" style={{ color: '#8b5a2b' }}>
            {readingStats.currentStreak}天
          </div>
        </div>
      </div>
      
      {/* 书架统计 */}
      <div style={{ marginBottom: 16 }}>
        <h3 className="shelf-title">书架统计</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10}}>
          <div className="stats-card">
            <div className="stats-title">待读</div>
            <div className="stats-value" style={{ color: '#007aff' }}>{stats.toRead}</div>
          </div>
          <div className="stats-card">
            <div className="stats-title">在读</div>
            <div className="stats-value" style={{ color: '#ff9500' }}>{stats.reading}</div>
          </div>
          <div className="stats-card">
            <div className="stats-title">已读</div>
            <div className="stats-value" style={{ color: '#34c759' }}>{stats.read}</div>
          </div>
        </div>
      </div>
      
      <div className="divider"></div>
      
      {/* 其他统计 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        <div className="stats-card">
          <div className="stats-title">笔记条数</div>
          <div className="stats-value">{notes.length}</div>
        </div>
        <div className="stats-card">
          <div className="stats-title">本月目标</div>
          <div className="stats-value" style={{ color: '#ff3b30' }}>
            {readingStats.monthlyRead}/{readingStats.monthlyGoal}
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-title">最爱分类</div>
          <div className="stats-value" style={{ fontSize: '1.3rem' }}>{readingStats.favoriteCategory}</div>
        </div>
        <div className="stats-card">
          <div className="stats-title">平均评分</div>
          <div className="stats-value" style={{ color: '#f60' }}>{readingStats.averageRating}</div>
        </div>
      </div>
    </div>
  )
}
export default Me