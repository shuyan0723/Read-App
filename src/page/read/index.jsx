import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addNote } from '../../utils/notes.js'
import { getItem, setItem } from '../../utils/storage.js'

const Read = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const storageKey = `progress:${id}`
  const [fontSize, setFontSize] = useState(18)
  const [theme, setTheme] = useState('light')
  const [progress, setProgress] = useState(() => getItem(storageKey, 0))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    return () => document.documentElement.removeAttribute('data-theme')
  }, [theme])

  useEffect(() => {
    setItem(storageKey, progress)
  }, [progress, storageKey])

  const content = useMemo(
    () =>
      '这里是示例章节内容（Mock）。你可以调整字号与主题，拖动进度条进行定位，并添加阅读笔记。'.repeat(8),
    [],
  )

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => navigate(-1)}>返回</button>
        <button style={{ marginLeft: 8 }} onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
          主题: {theme === 'light' ? '浅色' : '深色'}
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <label>
          字号
          <input
            type="range"
            min="14"
            max="28"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          />
        </label>
        <label>
          进度
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          />
          <span style={{ marginLeft: 8 }}>{progress}%</span>
        </label>
        <button
          onClick={() => {
            const text = window.prompt('添加一条阅读笔记（仅你可见）')
            if (text && text.trim()) {
              addNote({ bookId: String(id), text: text.trim() })
              alert('已保存到笔记')
            }
          }}
        >
          添加笔记
        </button>
      </div>

      <div style={{ lineHeight: 1.8, fontSize }}>{content}</div>
    </div>
  )
}
export default Read