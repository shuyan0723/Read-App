import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initMockData } from './utils/initMockData.js'

// 在开发环境下初始化Mock数据
if (import.meta.env.DEV) {
  initMockData()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
