import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/theme.css'
import './styles/discover.css'

import App from './App.jsx'
import { initMockData } from './utils/initMockData.js'

// 在开发环境下初始化Mock数据
if (import.meta.env.DEV) {
  initMockData()
}

// 初始化主题，避免首次渲染闪烁
try {
  const storedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light')
  document.documentElement.setAttribute('data-theme', theme)
} catch {
  // 忽略访问本地存储异常
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
