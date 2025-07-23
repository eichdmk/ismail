import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    comment: ''
  })
  const [isOrdering, setIsOrdering] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    setIsOrdering(true)
    
    // Имитация отправки заказа
    setTimeout(() => {
      alert('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.')
      clearCart()
      setOrderForm({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        comment: ''
      })
      setIsOrdering(false)
    }, 2000)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-content">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <h2>Корзина пуста</h2>
              <p>Добавьте товары в корзину, чтобы оформить заказ</p>
              <Link to="/catalog" className="btn btn-primary">
                Перейти в каталог
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Корзина</h1>
          <p>Товаров в корзине: {items.length}</p>
        </div>

        <div className="cart-content">
          {/* Список товаров */}
          <div className="cart-items">
            <div className="cart-items-header">
              <h2>Товары в корзине</h2>
              <button onClick={clearCart} className="clear-cart-btn">
                Очистить корзину
              </button>
            </div>

            <div className="cart-items-list">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <div className="cart-item-meta">
                      <span className="category">{item.category}</span>
                      <span className="material">{item.material}</span>
                    </div>
                    <div className="cart-item-price">
                      {formatPrice(item.price)} ₽
                    </div>
                  </div>

                  <div className="cart-item-quantity">
                    <label>Количество:</label>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">
                    <div className="item-total-price">
                      {formatPrice(item.price * item.quantity)} ₽
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-item-btn"
                      title="Удалить из корзины"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Форма заказа */}
          <div className="cart-order">
            <div className="order-summary">
              <h2>Итого</h2>
              <div className="summary-item">
                <span>Товары ({items.length}):</span>
                <span>{formatPrice(getCartTotal())} ₽</span>
              </div>
              <div className="summary-item">
                <span>Доставка:</span>
                <span>Бесплатно</span>
              </div>
              <div className="summary-total">
                <span>К оплате:</span>
                <span>{formatPrice(getCartTotal())} ₽</span>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="order-form">
              <h3>Данные для заказа</h3>
              
              <div className="form-group">
                <label>ФИО *</label>
                <input
                  type="text"
                  name="fullName"
                  value={orderForm.fullName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Введите ваше полное имя"
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={orderForm.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="example@email.com"
                />
              </div>

              <div className="form-group">
                <label>Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderForm.phone}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div className="form-group">
                <label>Адрес доставки</label>
                <textarea
                  name="address"
                  value={orderForm.address}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="3"
                  placeholder="Введите адрес доставки"
                />
              </div>

              <div className="form-group">
                <label>Комментарий к заказу</label>
                <textarea
                  name="comment"
                  value={orderForm.comment}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="3"
                  placeholder="Дополнительная информация"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary order-btn"
                disabled={isOrdering}
              >
                {isOrdering ? 'Оформляем заказ...' : 'Оформить заказ'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart 