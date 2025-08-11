import React, { useState, useEffect } from 'react'
import styles from './CustomToast.module.css'

// 创建一个简单的 Toast 组件
const CustomToast = ({ message, duration = 2000 }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  return (
    <div className={styles.toastContainer}>
      <div className={styles.toastContent}>
        {message}
      </div>
    </div>
  )
}

// 创建一个 Toast 工具函数
let toastInstance = null
let toastContainer = null

const showToast = (message, duration = 2000) => {
  // 移除之前的 Toast
  if (toastContainer) {
    document.body.removeChild(toastContainer)
  }

  // 创建新的容器
  toastContainer = document.createElement('div')
  document.body.appendChild(toastContainer)

  // 使用 ReactDOM 渲染 Toast
  import('react-dom/client').then(({ createRoot }) => {
    toastInstance = createRoot(toastContainer)
    toastInstance.render(
      <CustomToast message={message} duration={duration} />
    )
  })
}

export default showToast