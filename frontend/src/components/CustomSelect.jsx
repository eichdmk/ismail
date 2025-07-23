import React, { useState, useRef, useEffect } from 'react'
import './CustomSelect.css'

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Выберите опцию",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(
    options.find(option => option.value === value) || null
  )
  const selectRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const option = options.find(option => option.value === value)
    setSelectedOption(option || null)
  }, [value, options])

  const handleSelect = (option) => {
    setSelectedOption(option)
    onChange(option.value)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`custom-select ${className} ${isOpen ? 'open' : ''}`} ref={selectRef}>
      <div className="select-header" onClick={toggleDropdown}>
        <span className="select-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className="select-arrow" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
      
      {isOpen && (
        <div className="select-dropdown">
          {options.map((option, index) => (
            <div
              key={option.value}
              className={`select-option ${selectedOption?.value === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect 