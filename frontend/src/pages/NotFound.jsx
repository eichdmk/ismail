import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => (
  <div className="notfound-page container">
    <div className="notfound-content">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Страница не найдена</p>
      <p className="notfound-desc">Возможно, вы ошиблись адресом или страница была удалена.</p>
      <Link to="/" className="btn btn-primary notfound-btn">На главную</Link>
    </div>
  </div>
)

export default NotFound 