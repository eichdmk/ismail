import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../data/blog'
import './BlogPost.css'

const BlogPost = () => {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === parseInt(id))

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="post-not-found">
            <h2>Статья не найдена</h2>
            <p>Запрашиваемая статья не существует или была удалена</p>
            <Link to="/blog" className="btn btn-primary">
              Вернуться в блог
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Похожие посты
  const similarPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  return (
    <div className="blog-post-page">
      <div className="container">
        {/* Хлебные крошки */}
        <nav className="breadcrumbs">
          <Link to="/">Главная</Link>
          <span>/</span>
          <Link to="/blog">Блог</Link>
          <span>/</span>
          <Link to={`/blog?category=${post.category}`}>{post.category}</Link>
          <span>/</span>
          <span>{post.title}</span>
        </nav>

        <div className="blog-post-content">
          {/* Основной контент */}
          <main className="post-main">
            <article className="post-article">
              <header className="post-header">
                <div className="post-meta">
                  <span className="post-category">{post.category}</span>
                  <span className="post-date">{formatDate(post.date)}</span>
                </div>
                <h1 className="post-title">{post.title}</h1>
                <div className="post-info">
                  <div className="post-author">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>{post.author}</span>
                  </div>
                  <div className="post-stats">
                    <span className="read-time">{post.readTime}</span>
                    <span className="views">{post.views} просмотров</span>
                  </div>
                </div>
              </header>

              <div className="post-image">
                <img src={post.image} alt={post.title} />
              </div>

              <div className="post-content">
                <div 
                  className="post-text"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              <footer className="post-footer">
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="post-share">
                  <span>Поделиться:</span>
                  <div className="share-buttons">
                    <button className="share-btn" title="Поделиться в Facebook">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="share-btn" title="Поделиться в Twitter">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    <button className="share-btn" title="Поделиться в Telegram">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </footer>
            </article>
          </main>

          {/* Боковая панель */}
          <aside className="post-sidebar">
            <div className="sidebar-section">
              <h3>Автор</h3>
              <div className="author-info">
                <div className="author-avatar">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="author-details">
                  <h4>{post.author}</h4>
                  <p>Эксперт по дизайну интерьера</p>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Похожие статьи</h3>
              <div className="similar-posts">
                {similarPosts.map(similarPost => (
                  <Link 
                    key={similarPost.id} 
                    to={`/blog/${similarPost.id}`}
                    className="similar-post-card"
                  >
                    <img src={similarPost.image} alt={similarPost.title} />
                    <div className="similar-post-info">
                      <h4>{similarPost.title}</h4>
                      <span className="similar-post-date">{formatDate(similarPost.date)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Категории</h3>
              <div className="categories-list">
                {['Дизайн', 'Тренды', 'Уход', 'Интерьер', 'Планировка'].map(category => (
                  <Link 
                    key={category} 
                    to={`/blog?category=${category}`}
                    className={`category-link ${post.category === category ? 'active' : ''}`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default BlogPost 