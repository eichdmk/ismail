import React, { useState } from 'react'
import { blogPosts, categories } from '../data/blog'
import BlogCard from '../components/BlogCard'
import CustomSelect from '../components/CustomSelect'
import './Blog.css'

const Blog = () => {
  const [posts, setPosts] = useState(blogPosts)
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [showForm, setShowForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Дизайн'
  })

  // Опции для категорий
  const categoryOptions = categories.map(category => ({
    value: category,
    label: category
  }))

  const filteredPosts = selectedCategory === 'Все' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const post = {
      id: posts.length + 1,
      ...newPost,
      date: new Date().toISOString().split('T')[0],
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=400&fit=crop',
      tags: [],
      readTime: '5 мин',
      views: 0
    }

    setPosts([post, ...posts])
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: 'Дизайн'
    })
    setShowForm(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="blog-page">
      <div className="container">
        {/* Заголовок */}
        <div className="blog-header">
          <h1 className="blog-title">Наш блог</h1>
          <p className="blog-subtitle">
            Полезные статьи о дизайне интерьера и мебели
          </p>
        </div>

        <div className="blog-content">
          {/* Фильтры и кнопка добавления */}
          <div className="blog-controls">
            <div className="blog-filters">
              <CustomSelect
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Выберите категорию"
              />
            </div>
            
            <button 
              onClick={() => setShowForm(!showForm)}
              className="btn btn-primary add-post-btn"
            >
              {showForm ? 'Отменить' : 'Добавить статью'}
            </button>
          </div>

          {/* Форма добавления поста */}
          {showForm && (
            <div className="add-post-form">
              <h3>Добавить новую статью</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Заголовок</label>
                  <input
                    type="text"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Краткое описание</label>
                  <textarea
                    name="excerpt"
                    value={newPost.excerpt}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Содержание</label>
                  <textarea
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                    rows="8"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Автор</label>
                    <input
                      type="text"
                      name="author"
                      value={newPost.author}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Категория</label>
                    <CustomSelect
                      options={categoryOptions.slice(1)} // Убираем "Все" из формы
                      value={newPost.category}
                      onChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}
                      placeholder="Выберите категорию"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Опубликовать
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="btn btn-secondary"
                  >
                    Отменить
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Список постов */}
          <div className="blog-posts">
            {filteredPosts.length > 0 ? (
              <div className="posts-grid">
                {filteredPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="no-posts">
                <div className="no-posts-content">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                  </svg>
                  <h3>Статьи не найдены</h3>
                  <p>Попробуйте выбрать другую категорию</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog 