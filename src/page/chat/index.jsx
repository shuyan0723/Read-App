import React, { useState, useEffect, useRef } from 'react'
import { Button, Loading } from 'react-vant'
import styles from './styles.module.css'
import axios from '../../api/config'

import { streamChat } from '../../llm'  // 导入流式调用函数
import CustomInput from '../../components/CustomInput'
import showToast from '../../components/CustomToast'


export default function BookChat() {
  // 状态管理
  const [messages, setMessages] = useState([
    { id: 1, text: '您好！欢迎使用读书智能客服。请问有什么可以帮助您的？', sender: 'assistant', time: '10:00' }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStreamMessageId, setCurrentStreamMessageId] = useState(null)
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
  const handleSendMessage = async() => {
    if (!inputText.trim()) {
      showToast('请输入内容后发送') 
      return
    }

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], 
        { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInputText('')
    setIsLoading(true)

    // 创建一个新的AI消息ID
    const aiMessageId = Date.now() + 1;
    setCurrentStreamMessageId(aiMessageId);

    // 添加一个空的AI消息占位符
    const initialAiMessage = {
      id: aiMessageId,
      text: '',
      sender: 'assistant',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true
    };
    setMessages(prevMessages => [...prevMessages, initialAiMessage]);

    // 调用流式API
    const messagesForAPI = [
      { role: 'system', content: '您好！欢迎使用读书智能客服。请问有什么可以帮助您的？' },
      { role: 'user', content: inputText }
    ];

    streamChat(
      messagesForAPI,
      // 接收每个chunk的回调
      (chunk, accumulatedContent) => {
        setMessages(prevMessages => {
          return prevMessages.map(msg => {
            if (msg.id === aiMessageId) {
              return { ...msg, text: accumulatedContent };
            }
            return msg;
          });
        });
      },
      // 完成回调
      (fullContent) => {
        setMessages(prevMessages => {
          return prevMessages.map(msg => {
            if (msg.id === aiMessageId) {
              return { ...msg, isStreaming: false };
            }
            return msg;
          });
        });
        setIsLoading(false);
        setCurrentStreamMessageId(null);
        showToast('回复完成');
      },
      // 错误回调
      (error) => {
        setMessages(prevMessages => {
          return prevMessages.filter(msg => msg.id !== aiMessageId);
        });
        setIsLoading(false);
        setCurrentStreamMessageId(null);
        showToast('获取回复失败，请稍后重试');
        console.error('Chat stream error:', error);
      }
    );
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
            className={`${styles.messageWrapper} 
            ${message.sender === 'user' ? styles.userMessage : styles.assistantMessage}`}
          >
            <div className={styles.messageContent}>
              <div className={styles.messageText}>{message.text}</div>
              <div className={styles.messageTime}>{message.time}</div>
            </div>
          </div>
        ))}
        {isLoading && currentStreamMessageId === null && (
          <div className={styles.loadingWrapper}>
            <Loading size="20" className={styles.loading} />
          </div>
        )}
        <div ref={messagesEndRef} /> {/* 用于自动滚动到底部的锚点 */}
      </div>

      <div className={styles.chatInput}>
        <CustomInput
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="请输入您的问题..."
          onKeyPress={handleKeyPress}
          className={styles.input}
          clearable
          disabled={isLoading}
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