import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  const calculateDiscount = () => {
    if (product.oldPrice) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    }
    return 0
  }

  const discount = calculateDiscount()

  return (
    <div className="product-card">
      <Link to={`/catalog/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          
          {/* Бейджи */}
          <div className="product-badges">
            {product.isNew && <span className="badge badge-new">Новинка</span>}
            {product.isBestSeller && <span className="badge badge-bestseller">Топ продаж</span>}
            {discount > 0 && <span className="badge badge-discount">-{discount}%</span>}
          </div>

          {/* Кнопка быстрого добавления */}
        </div>
      </Link>

      <div className="product-content">
        <Link to={`/catalog/${product.id}`} className="product-link">
          <div className="product-category">{product.category}</div>
          <h3 className="product-title highlight-title">{product.name}</h3>
        </Link>

        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            ))}
          </div>
          <span className="rating-value">{product.rating}</span>
          <span className="reviews-count">({product.reviews})</span>
        </div>

        <div className="product-specs">
          <span className="spec-item">Материал: {product.material}</span>
          <span className="spec-item">Цвет: {product.color}</span>
        </div>

        <div className="product-pricing">
          <div className="price-row">
            <span className="current-price price-badge">{formatPrice(product.price)} ₽</span>
            {product.oldPrice && (
              <span className="old-price">{formatPrice(product.oldPrice)} ₽</span>
            )}
          </div>
          {/* {discount > 0 && (
            <div className="discount-info">
              <span className="discount-text">Экономия {formatPrice(product.oldPrice - product.price)} ₽</span>
            </div>
          )} */}
        </div>

        <button 
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          В корзину
        </button>
      </div>
    </div>
  )
}

export default ProductCard 