import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { getCartCount } = useCart()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Логотип */}
          <Link to="/" className="logo">
            <span className="logo-text">Assina</span>
            <span className="logo-subtitle">Мебель в стиле лофт</span>
          </Link>

          {/* Навигация */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Главная</Link></li>
              <li><Link to="/catalog" onClick={() => setIsMenuOpen(false)}>Каталог</Link></li>
              <li><Link to="/blog" onClick={() => setIsMenuOpen(false)}>Блог</Link></li>
              <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>О нас</Link></li>
            </ul>
          </nav>

          {/* Поиск и корзина */}
          <div className="header-actions">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Поиск мебели..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </form>

            <Link to="/cart" className="cart-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {getCartCount() > 0 && (
                <span className="cart-count">{getCartCount()}</span>
              )}
            </Link>

            {/* Мобильное меню */}
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 