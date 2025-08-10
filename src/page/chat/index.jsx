import React, { useState, useEffect, useRef } from 'react'
import { Button, Input, Loading, Toast } from 'react-vant'
import styles from './styles.module.css'

export default function BookChat() {
  // 状态管理
  const [messages, setMessages] = useState([
    { id: 1, text: '您好！欢迎使用读书智能客服。请问有什么可以帮助您的？', sender: 'assistant', time: '10:00' }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // 监听消息变化，自动滚动到底部
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 处理发送消息
  const handleSendMessage = () => {
    if (!inputText.trim()) {
      Toast('请输入内容后发送')
      return
    }

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prevMessages => [...prevMessages, userMessage])
    setInputText('')
    setIsLoading(true)

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: '感谢您的提问！我们有丰富的书籍资源和阅读建议，请问您对哪类书籍感兴趣？',
        sender: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prevMessages => [...prevMessages, aiResponse])
      setIsLoading(false)
      Toast('收到回复')
    }, 1500)
  }

  // 处理回车键发送消息
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h2>读书智能客服</h2>
      </div>

      <div className={styles.chatMessages}>
        {messages.map(message => (
          <div
            key={message.id}
            className={`${styles.messageWrapper} ${message.sender === 'user' ? styles.userMessage : styles.assistantMessage}`}
          >
            <div className={styles.messageContent}>
              <div className={styles.messageText}>{message.text}</div>
              <div className={styles.messageTime}>{message.time}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={styles.loadingWrapper}>
            <Loading size="20" className={styles.loading} />
          </div>
        )}
        <div ref={messagesEndRef} /> {/* 用于自动滚动到底部的锚点 */}
      </div>

      <div className={styles.chatInput}>
        <Input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="请输入您的问题..."
          onKeyPress={handleKeyPress}
          className={styles.input}
          clearable
        />
        <Button
          type="primary"
          onClick={handleSendMessage}
          disabled={isLoading}
          className={styles.sendButton}
        >
          {isLoading ? <Loading size="16" color="white" /> : '发送'}
        </Button>
      </div>
    </div>
  )
}