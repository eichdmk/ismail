import React from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blog'
import './About.css'

const About = () => {
  const latestBlogPost = blogPosts[0]

  return (
    <div className="about-page">
      <div className="container">
        {/* Заголовок */}
        <div className="about-header">
          <h1 className="about-title">О нас</h1>
          <p className="about-subtitle">
            Создаем уникальную мебель в стиле лофт с 2015 года
          </p>
        </div>

        {/* Основная информация */}
        <section className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h2>Наша история</h2>
              <p>
                Компания Assina была основана в 2015 году группой дизайнеров и мастеров, 
                влюбленных в стиль лофт и качественную мебель. Мы начали с небольшой 
                мастерской в Москве и за эти годы выросли в одну из ведущих компаний 
                по производству мебели в стиле лофт в России.
              </p>
              <p>
                Наша миссия - создавать не просто мебель, а произведения искусства, 
                которые будут радовать вас долгие годы. Мы используем только 
                натуральные материалы и следуем традициям качественного производства.
              </p>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop" 
                alt="Наша мастерская"
              />
            </div>
          </div>
        </section>

        {/* Наши ценности */}
        <section className="values-section">
          <h2 className="section-title">Наши ценности</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h3>Качество</h3>
              <p>Используем только лучшие материалы и следуем строгим стандартам качества</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Надежность</h3>
              <p>Гарантируем долговечность и надежность каждого изделия</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <h3>Инновации</h3>
              <p>Постоянно совершенствуем технологии и дизайн</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Команда</h3>
              <p>Опытные мастера и дизайнеры работают над каждым проектом</p>
            </div>
          </div>
        </section>

        {/* Статистика */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div className="stat-number">8+</div>
              <div className="stat-label">Лет опыта</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="stat-number">1000+</div>
              <div className="stat-label">Довольных клиентов</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Уникальных изделий</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Городов доставки</div>
            </div>
          </div>
        </section>

        {/* Последний пост блога */}
        <section className="latest-blog-section">
          <div className="latest-blog-content">
            <div className="latest-blog-text">
              <h2>Последняя статья в блоге</h2>
              <h3>{latestBlogPost.title}</h3>
              <p>{latestBlogPost.excerpt}</p>
              <div className="blog-meta">
                <span className="blog-author">Автор: {latestBlogPost.author}</span>
                <span className="blog-date">
                  {new Date(latestBlogPost.date).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <Link to={`/blog/${latestBlogPost.id}`} className="btn btn-primary">
                Читать статью
              </Link>
            </div>
            <div className="latest-blog-image">
              <img src={latestBlogPost.image} alt={latestBlogPost.title} />
            </div>
          </div>
        </section>

        {/* Контакты */}
        <section className="contact-section">
          <h2 className="section-title">Наша команда</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Александр Петров</h3>
              <p className="member-role">Главный дизайнер</p>
              <p className="member-desc">Создает уникальные концепции мебели в стиле лофт с 2015 года</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Мария Сидорова</h3>
              <p className="member-role">Руководитель производства</p>
              <p className="member-desc">Контролирует качество каждого изделия и процесс изготовления</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Дмитрий Козлов</h3>
              <p className="member-role">Мастер-краснодеревщик</p>
              <p className="member-desc">Более 15 лет опыта в работе с натуральным деревом</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About 