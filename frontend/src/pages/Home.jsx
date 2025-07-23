import React from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { blogPosts } from '../data/blog'
import ProductCard from '../components/ProductCard'
import BlogCard from '../components/BlogCard'
import './Home.css'

const Home = () => {
  // Получаем топ продукты
  const topProducts = products.filter(product => product.isBestSeller).slice(0, 10)
  const latestProducts = products.filter(product => product.isNew).slice(0, 10)
  const latestBlogPost = blogPosts[0] // Самый свежий пост

  return (
    <div className="home">
      {/* Героическая секция */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Мебель в стиле <span className="highlight">лофт</span> для вашего дома
              </h1>
              <p className="hero-subtitle">
                Создаем уникальную мебель из натуральных материалов. 
                Качество, стиль и комфорт в каждом изделии.
              </p>
              <div className="hero-actions">
                <Link to="/catalog" className="btn btn-primary">
                  Перейти в каталог
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  Узнать больше
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop" 
                alt="Мебель в стиле лофт"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B5C2A" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Качественные материалы</h3>
              <p>Используем только натуральное дерево и экологичные материалы</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B5C2A" strokeWidth="2">
                  <rect x="4" y="4" width="16" height="16" rx="8"/>
                  <path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Надежность</h3>
              <p>Гарантия качества на всю продукцию</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B5C2A" strokeWidth="2">
                  <rect x="2" y="8" width="20" height="8" rx="4"/>
                  <path d="M6 12h12" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Быстрая доставка</h3>
              <p>Доставляем по всей России в кратчайшие сроки</p>
            </div>
          </div>
        </div>
      </section>

      {/* Топ продаж */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Топ продаж</h2>
          <div className="products-grid">
            {topProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-actions">
            <Link to="/catalog" className="btn btn-primary">
              Смотреть все товары
            </Link>
          </div>
        </div>
      </section>

      {/* Новинки */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Новинки</h2>
          <div className="products-grid">
            {latestProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-actions">
            <Link to="/catalog" className="btn btn-secondary">
              Перейти в каталог
            </Link>
          </div>
        </div>
      </section>

      {/* Блог секция */}
      <section className="section">
        <div className="container">
          <div className="blog-section">
            <div className="blog-section-header">
              <h2 className="section-title">Наш блог</h2>
              <Link to="/blog" className="btn btn-secondary">
                Все статьи
              </Link>
            </div>
            
            <div className="blog-highlight">
              <div className="blog-main">
                <BlogCard post={latestBlogPost} isMain={true} />
              </div>
              <div className="blog-sidebar">
                {blogPosts.slice(1, 4).map(post => (
                  <BlogCard key={post.id} post={post} isMain={false} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Готовы создать идеальный интерьер?</h2>
            <p>Наши дизайнеры помогут подобрать мебель именно для вашего пространства</p>
            <div className="cta-actions">
              <Link to="/catalog" className="btn btn-primary">
                Начать покупки
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 