import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const product = products.find(p => p.id === parseInt(id))

  // Анимация появления страницы
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-not-found">
            <h2>Товар не найден</h2>
            <p>Запрашиваемый товар не существует или был удален</p>
            <Link to="/catalog" className="btn btn-primary">
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    // Анимация добавления в корзину
    const btn = document.querySelector('.add-to-cart-btn')
    btn.classList.add('added')
    setTimeout(() => btn.classList.remove('added'), 1000)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  // Имитация дополнительных изображений
  const productImages = [
    product.image,
    product.image.replace('w=400&h=300', 'w=400&h=300&fit=crop&crop=center'),
    product.image.replace('w=400&h=300', 'w=400&h=300&fit=crop&crop=top'),
    product.image.replace('w=400&h=300', 'w=400&h=300&fit=crop&crop=bottom')
  ]

  // Имитация отзывов
  const reviews = [
    {
      id: 1,
      author: "Анна К.",
      rating: 5,
      date: "2024-01-15",
      text: "Отличный товар! Качество превзошло все ожидания. Очень довольна покупкой."
    },
    {
      id: 2,
      author: "Михаил С.",
      rating: 4,
      date: "2024-01-10",
      text: "Хороший товар, но доставка заняла больше времени, чем ожидалось."
    },
    {
      id: 3,
      author: "Елена В.",
      rating: 5,
      date: "2024-01-08",
      text: "Превосходное качество! Рекомендую всем друзьям и знакомым."
    }
  ]

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0

  // Карусель похожих товаров
  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const carouselVisible = 2 // сколько товаров видно одновременно

  const handlePrev = () => {
    setCarouselIndex(i => Math.max(0, i - 1))
  }
  const handleNext = () => {
    setCarouselIndex(i => Math.min(similarProducts.length - carouselVisible, i + 1))
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Хлебные крошки */}
        <nav className="breadcrumbs">
          <Link to="/">Главная</Link>
          <span>/</span>
          <Link to="/catalog">Каталог</Link>
          <span>/</span>
          <Link to={`/catalog?category=${product.category}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Галерея изображений */}
          <div className="product-gallery">
            <div className="main-image" onClick={() => setIsImageModalOpen(true)}>
              <img src={productImages[selectedImage]} alt={product.name} />
              {product.isNew && <span className="product-badge new">Новинка</span>}
              {product.isBestSeller && <span className="product-badge bestseller">Топ продаж</span>}
              {discount > 0 && <span className="product-badge discount">-{discount}%</span>}
              <div className="image-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
            </div>
            <div className="thumbnail-images">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Информация о продукте */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
            </div>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
              </div>
              <span className="rating-text">{product.rating}</span>
              <span className="reviews-count">({product.reviews} отзывов)</span>
            </div>

            <div className="product-price">
              <span className="price">{formatPrice(product.price)} ₽</span>
              {product.oldPrice && (
                <span className="old-price">{formatPrice(product.oldPrice)} ₽</span>
              )}
            </div>

            {/* Табы с информацией */}
            <div className="product-tabs">
              <div className="tab-buttons">
                <button 
                  className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                  onClick={() => setActiveTab('description')}
                >
                  Описание
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specifications')}
                >
                  Характеристики
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Отзывы ({reviews.length})
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'description' && (
                  <div className="description-content">
                    <p className={showFullDescription ? 'full' : 'truncated'}>
                      {product.description}
                    </p>
                    <button 
                      className="show-more-btn"
                      onClick={() => setShowFullDescription(!showFullDescription)}
                    >
                      {showFullDescription ? 'Скрыть' : 'Читать далее'}
                    </button>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="specs-grid">
                    <div className="spec-item">
                      <span className="spec-label">Категория:</span>
                      <span className="spec-value">{product.category}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Материал:</span>
                      <span className="spec-value">{product.material}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Цвет:</span>
                      <span className="spec-value">{product.color}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Размеры:</span>
                      <span className="spec-value">{product.dimensions}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Наличие:</span>
                      <span className={`spec-value ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {product.inStock ? 'В наличии' : 'Нет в наличии'}
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="reviews-content">
                    {reviews.map(review => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="review-author">{review.author}</div>
                          <div className="review-rating">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill={i < review.rating ? "currentColor" : "none"} 
                                stroke="currentColor" 
                                strokeWidth="2"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                              </svg>
                            ))}
                          </div>
                          <div className="review-date">{new Date(review.date).toLocaleDateString('ru-RU')}</div>
                        </div>
                        <div className="review-text">{review.text}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Добавление в корзину */}
            <div className="add-to-cart-section">
              <div className="quantity-selector">
                <label>Количество:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="btn btn-primary add-to-cart-btn"
                disabled={!product.inStock}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>

        {/* Похожие товары */}
        <section className="similar-products-horizontal">
          <h3>Похожие товары</h3>
          <div className="similar-products-list">
            {similarProducts.slice(0, 2).map(similarProduct => (
              <Link
                key={similarProduct.id}
                to={`/catalog/${similarProduct.id}`}
                className="similar-product-card-vertical"
              >
                <img src={similarProduct.image} alt={similarProduct.name} />
                <div className="vertical-info">
                  <h4>{similarProduct.name}</h4>
                  <div className="vertical-price">{formatPrice(similarProduct.price)} ₽</div>
                </div>
              </Link>
            ))}
          </div>
          {similarProducts.length > carouselVisible && (
            <div className="carousel-wrapper">
              <button className="carousel-arrow left" onClick={handlePrev} disabled={carouselIndex === 0}>
                &#8592;
              </button>
              <div className="carousel-track">
                {similarProducts.slice(carouselIndex, carouselIndex + carouselVisible).map(similarProduct => (
                  <Link
                    key={similarProduct.id}
                    to={`/catalog/${similarProduct.id}`}
                    className="carousel-card"
                  >
                    <img src={similarProduct.image} alt={similarProduct.name} />
                    <div className="carousel-info">
                      <h4>{similarProduct.name}</h4>
                      <div className="carousel-price">{formatPrice(similarProduct.price)} ₽</div>
                    </div>
                  </Link>
                ))}
              </div>
              <button className="carousel-arrow right" onClick={handleNext} disabled={carouselIndex >= similarProducts.length - carouselVisible}>
                &#8594;
              </button>
            </div>
          )}
        </section>

        {/* Информация о доставке */}
        <section className="delivery-info">
          <h2>Информация о доставке</h2>
          <div className="delivery-grid">
            <div className="delivery-item">
              <div className="delivery-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16,8 20,8 23,11 23,16 16,16 16,8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h3>Доставка по Москве</h3>
              <p>Бесплатная доставка при заказе от 10 000 ₽</p>
              <span className="delivery-price">от 500 ₽</span>
            </div>
            <div className="delivery-item">
              <div className="delivery-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3>Доставка по России</h3>
              <p>Доставка в любую точку России</p>
              <span className="delivery-price">от 1 500 ₽</span>
            </div>
            <div className="delivery-item">
              <div className="delivery-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
              </div>
              <h3>Время доставки</h3>
              <p>Доставка в течение 1-3 дней</p>
              <span className="delivery-time">1-3 дня</span>
            </div>
          </div>
        </section>

        {/* Почему выбирают нас */}
        <section className="why-choose-us">
          <h2>Почему выбирают нас</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h3>Высокое качество</h3>
              <p>Все товары проходят строгий контроль качества</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Гарантия</h3>
              <p>Гарантия на все товары от 1 года</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
              </div>
              <h3>Надежность</h3>
              <p>Более 10 000 довольных клиентов</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3>Поддержка</h3>
              <p>Круглосуточная поддержка клиентов</p>
            </div>
          </div>
        </section>

      </div>

      {/* Модальное окно для изображения */}
      {isImageModalOpen && (
        <div className="image-modal" onClick={() => setIsImageModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsImageModalOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img src={productImages[selectedImage]} alt={product.name} />
            <div className="modal-thumbnails">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`modal-thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail 