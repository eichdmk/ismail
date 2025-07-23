import React from 'react'
import { Link } from 'react-router-dom'
import './BlogCard.css'

const BlogCard = ({ post, isMain = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Link to={`/blog/${post.id}`} className={`blog-card ${isMain ? 'blog-card-main' : ''}`}>
      <div className="blog-image">
        <img src={post.image} alt={post.title} />
        <div className="blog-meta">
          <span className="blog-category">{post.category}</span>
          <span className="blog-date">{formatDate(post.date)}</span>
        </div>
      </div>
      
      <div className="blog-content">
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        
        <div className="blog-footer">
          <div className="blog-author">
            <span>Автор: {post.author}</span>
          </div>
          <div className="blog-stats">
            <span className="read-time">{post.readTime}</span>
            <span className="views">{post.views} просмотров</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard 