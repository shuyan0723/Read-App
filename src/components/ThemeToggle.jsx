import React, { useEffect, useState } from 'react'

function getInitialTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-theme') || 'light'
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme())

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    } catch {
      // 忽略
    }
  }, [theme])

  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <div className="theme-toggle">
      <button
        className="btn btn-outline"
        onClick={() => setTheme(nextTheme)}
        aria-label="切换主题"
        title="切换主题"
      >
        {theme === 'light' ? '🌞 亮色' : '🌙 暗色'}
      </button>
    </div>
  )
}

export default ThemeToggle


