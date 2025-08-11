import React, { useState, useEffect } from 'react'
import styles from './CustomInput.module.css'

const CustomInput = ({ value, onChange, placeholder, onKeyPress, className, clearable }) => {
  const [isFocused, setIsFocused] = useState(false)

  // 处理清除按钮点击
  const handleClear = (e) => {
    e.stopPropagation()
    if (onChange) {
      onChange({ target: { value: '' } })
    }
  }

  return (
    <div className={`${styles.inputWrapper} ${className || ''} ${isFocused ? styles.focused : ''}`}>
      <input
        type="text"
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={styles.input}
      />
      {clearable && value && value.trim() && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="清除"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default CustomInput