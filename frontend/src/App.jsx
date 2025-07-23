import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Blog from './pages/Blog'
import About from './pages/About'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import BlogPost from './pages/BlogPost'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import { CartProvider } from './context/CartContext'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const formRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location])

  useEffect(() => {
    if (location.pathname === '/contact') {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location])

  useEffect(() => {
    // Имитация загрузки
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Загрузка...</p>
      </div>
    )
  }

  return (
    <CartProvider>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<ProductDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App