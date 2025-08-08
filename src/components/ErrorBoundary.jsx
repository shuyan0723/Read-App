import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // 可接入日志上报
    // 开发环境打印详细错误
    try {
      console.error('Render error:', error, info)
    } catch {
      // 忽略控制台错误
    }
  }

  handleReload = () => {
    if (typeof this.props.onReset === 'function') {
      try {
        this.props.onReset()
      } catch {
        // 忽略重置错误
      }
    }
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16 }}>
          <h2>页面出错了</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => (window.location.href = '/')}>返回首页</button>
            <button onClick={this.handleReload} style={{ marginLeft: 8 }}>
              刷新页面
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}


