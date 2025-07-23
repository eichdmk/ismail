import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories, materials, colors } from '../data/products'
import ProductCard from '../components/ProductCard'
import CustomSelect from '../components/CustomSelect'
import './Catalog.css'

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [selectedMaterial, setSelectedMaterial] = useState('Все')
  const [selectedColor, setSelectedColor] = useState('Все')
  const [showFilters, setShowFilters] = useState(false)

  // Опции для сортировки
  const sortOptions = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'price-asc', label: 'По цене (возрастание)' },
    { value: 'price-desc', label: 'По цене (убывание)' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'reviews', label: 'По количеству отзывов' },
    { value: 'newest', label: 'Сначала новинки' }
  ]

  // Получаем параметры из URL
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    let filtered = [...products]

    // Поиск по названию
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Фильтр по категории
    if (selectedCategory !== 'Все') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Фильтр по материалу
    if (selectedMaterial !== 'Все') {
      filtered = filtered.filter(product => product.material === selectedMaterial)
    }

    // Фильтр по цвету
    if (selectedColor !== 'Все') {
      filtered = filtered.filter(product => product.color === selectedColor)
    }

    // Фильтр по цене
    if (priceRange.min !== '') {
      filtered = filtered.filter(product => product.price >= parseInt(priceRange.min))
    }
    if (priceRange.max !== '') {
      filtered = filtered.filter(product => product.price <= parseInt(priceRange.max))
    }

    // Сортировка
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew)
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, selectedMaterial, selectedColor, priceRange, sortBy])

  const clearFilters = () => {
    setSelectedCategory('Все')
    setSelectedMaterial('Все')
    setSelectedColor('Все')
    setPriceRange({ min: '', max: '' })
    setSortBy('default')
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  return (
    <div className="catalog">
      <div className="container">
        {/* Заголовок */}
        <div className="catalog-header">
          <h1 className="catalog-title">
            {searchQuery ? `Поиск: "${searchQuery}"` : 'Каталог мебели'}
          </h1>
          <p className="catalog-subtitle">
            Найдено товаров: {filteredProducts.length}
          </p>
        </div>

        <div className="catalog-content">
          {/* Фильтры */}
          <aside className={`catalog-filters ${showFilters ? 'filters-open' : ''}`}>
            <div className="filters-header">
              <h3>Фильтры</h3>
              <button 
                className="mobile-filters-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
                </svg>
              </button>
            </div>

            <div className="filters-content">
              {/* Сортировка */}
              <div className="filter-group">
                <h4>Сортировка</h4>
                <CustomSelect
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Выберите сортировку"
                />
              </div>

              {/* Категории */}
              <div className="filter-group">
                <h4>Категория</h4>
                <div className="filter-options">
                  {categories.map(category => (
                    <label key={category} className="filter-option">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Материалы */}
              <div className="filter-group">
                <h4>Материал</h4>
                <div className="filter-options">
                  {materials.map(material => (
                    <label key={material} className="filter-option">
                      <input
                        type="radio"
                        name="material"
                        value={material}
                        checked={selectedMaterial === material}
                        onChange={(e) => setSelectedMaterial(e.target.value)}
                      />
                      <span>{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Цвета */}
              <div className="filter-group">
                <h4>Цвет</h4>
                <div className="filter-options">
                  {colors.map(color => (
                    <label key={color} className="filter-option">
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={selectedColor === color}
                        onChange={(e) => setSelectedColor(e.target.value)}
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ценовой диапазон */}
              <div className="filter-group">
                <h4>Цена</h4>
                <div className="price-range">
                  <input
                    type="number"
                    placeholder="От"
                    value={priceRange.min}
                    min="0"
                    onChange={(e) => {
                      const value = Math.max(0, parseInt(e.target.value) || 0)
                      setPriceRange(prev => ({ ...prev, min: value.toString() }))
                    }}
                    className="price-input"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="До"
                    value={priceRange.max}
                    min="0"
                    onChange={(e) => {
                      const value = Math.max(0, parseInt(e.target.value) || 0)
                      setPriceRange(prev => ({ ...prev, max: value.toString() }))
                    }}
                    className="price-input"
                  />
                </div>
              </div>

              {/* Кнопка сброса */}
              <button onClick={clearFilters} className="btn btn-secondary clear-filters">
                Сбросить фильтры
              </button>
            </div>
          </aside>

          {/* Товары */}
          <main className="catalog-main">
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <div className="no-products-content">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <h3>Товары не найдены</h3>
                  <p>Попробуйте изменить параметры фильтрации</p>
                  <button onClick={clearFilters} className="btn btn-primary">
                    Сбросить фильтры
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Catalog 