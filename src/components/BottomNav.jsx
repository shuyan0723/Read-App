import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: '书架', icon: '📚' },
  { path: '/discover', label: '发现', icon: '🔍' },
  { path: '/notes', label: '笔记', icon: '📝' },
  { path: '/me', label: '我的', icon: '👤' },
]

const BottomNav = () => {
  const location = useLocation()
  
  // 在书籍详情和阅读页面隐藏导航栏
  if (location.pathname.startsWith('/book/') || location.pathname.startsWith('/read/')) {
    return null
  }

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTop: '1px solid #eee',
        display: 'flex',
        padding: '8px 0',
        zIndex: 1000,
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: isActive ? '#007aff' : '#666',
              fontSize: 12,
              padding: '4px 0',
            }}
          >
            <span style={{ fontSize: 20, marginBottom: 2 }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNav
