import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: '书架', icon: '📚' },
  { path: '/discover', label: '发现', icon: '🔍' },
  { path: '/ai', label: 'AI', icon: '🤖' },
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
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <Link key={item.path} to={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNav
