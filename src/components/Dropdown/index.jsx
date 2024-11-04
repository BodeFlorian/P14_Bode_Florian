import React, { useState, useEffect, useRef } from 'react'
import './index.scss'

const Dropdown = ({ options, onSelect, defaultValue, label }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(defaultValue || '')
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1)
  const dropdownRef = useRef(null)

  const handleSelectOption = (option) => {
    setSelectedOption(option)
    onSelect(option)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
    if (!isOpen) {
      setFocusedOptionIndex(-1)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (isOpen && focusedOptionIndex >= 0) {
        handleSelectOption(options[focusedOptionIndex])
      } else {
        toggleDropdown()
      }
    }

    if (isOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedOptionIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : 0,
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedOptionIndex((prev) =>
          prev > 0 ? prev - 1 : options.length - 1,
        )
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="dropdown-container">
      <label id="dropdown-label" className="dropdown-label">
        {label}
      </label>
      <div
        className="dropdown"
        ref={dropdownRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-labelledby="dropdown-label"
        aria-expanded={isOpen}
        aria-controls="dropdown-list"
        aria-activedescendant={
          focusedOptionIndex >= 0
            ? `dropdown-option-${focusedOptionIndex}`
            : undefined
        }
      >
        <div
          className="dropdown-header"
          onClick={toggleDropdown}
          role="button"
          aria-labelledby="dropdown-label"
          aria-expanded={isOpen}
          tabIndex={0}
        >
          {selectedOption || 'Select an option'}
          <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}></span>
        </div>
        {isOpen && (
          <ul
            id="dropdown-list"
            className="dropdown-list"
            role="listbox"
            aria-labelledby="dropdown-label"
          >
            {options.map((option, index) => (
              <li
                id={`dropdown-option-${index}`}
                key={index}
                className={`dropdown-item ${
                  option === selectedOption ? 'selected' : ''
                } ${index === focusedOptionIndex ? 'focused' : ''}`}
                onClick={() => handleSelectOption(option)}
                role="option"
                aria-selected={option === selectedOption}
                tabIndex={-1}
                onMouseEnter={() => setFocusedOptionIndex(index)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dropdown
