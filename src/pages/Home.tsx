import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { products, getProductImagePath } from '../data/products';
import './Home.css';
import '../styles/customizable-notice.css';

const Home: React.FC = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatProductName = (name: string): string => {
    return name;
  };

  // Create array of hero background images from different products
  const heroImages = [
    getProductImagePath('couches', products.couches[0].id, products.couches[0].images[0]),
    getProductImagePath('beds', products.beds[0].id, products.beds[0].images[0]),
    getProductImagePath('couches', products.couches[1].id, products.couches[1].images[0]),
    getProductImagePath('beds', products.beds[1].id, products.beds[1].images[0]),
    getProductImagePath('couches', products.couches[2].id, products.couches[2].images[0]),
    getProductImagePath('beds', products.beds[2].id, products.beds[2].images[0]),
  ];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="home">
      {/* Hero Section with Carousel */}
      <section className="hero">
        <div className="hero__backgrounds">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`hero__background ${index === currentImageIndex ? 'hero__background--active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        <div className="hero__overlay"></div>
        
        {/* Navigation Indicators */}
        <div className="hero__indicators">
          {heroImages.map((_, index) => (
        <button 
              key={index}
              className={`hero__indicator ${index === currentImageIndex ? 'hero__indicator--active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        <div className="hero__content">
          <h1 className="hero__headline">{t('home.hero.title')}</h1>
          <Link to="/couches" className="btn hero__cta">{t('home.hero.cta')}</Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <div className="container">
          <h2 className="section-title">{t('home.featured.title')}</h2>
          <div className="featured-categories__grid">
            <Link to="/beds" className="category-card">
              <div className="category-card__image">
                <img src={getProductImagePath('beds', products.beds[0].id, products.beds[0].images[2] || products.beds[0].images[0])} alt="Beds" />
                <div className="category-card__overlay"></div>
              </div>
              <div className="category-card__content">
                <h3 className="category-card__title">{t('nav.beds')}</h3>
              </div>
            </Link>
            <Link to="/couches" className="category-card">
              <div className="category-card__image">
                <img src={getProductImagePath('couches', products.couches[2].id, products.couches[2].images[1] || products.couches[2].images[0])} alt="Couches" />
                <div className="category-card__overlay"></div>
              </div>
              <div className="category-card__content">
                <h3 className="category-card__title">{t('nav.couches')}</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Customizable Notice */}
      <section className="customizable-notice">
        <div className="container">
          <div className="customizable-notice__content">
            <svg className="customizable-notice__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <p className="customizable-notice__text">{t('home.customizable')}</p>
            <a 
              href={`https://wa.me/972534210088`}
              target="_blank"
              rel="noopener noreferrer"
              className="customizable-notice__whatsapp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.98 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="all-products">
        <div className="container">
          <h2 className="section-title">{'All Products'}</h2>
          
          {/* Beds Section */}
          <div className="products-section">
            <h3 className="products-section__title">{t('nav.beds')}</h3>
            <div className="new-arrivals__grid">
              {products.beds.map((product) => {
                const primaryImage = getProductImagePath(product.category, product.id, product.images[0]);
                return (
                  <Link 
                    key={product.id} 
                    to={`/${product.category}/${product.id}`}
                    className="product-card"
                  >
                    <div className="product-card__image-wrapper">
                      <img 
                        src={primaryImage} 
                        alt={formatProductName(product.name)} 
                        className="product-card__image"
                        loading="lazy"
                      />
                      <button
                        className={`product-card__favorite ${isFavorite(product.id) ? 'product-card__favorite--active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        aria-label={t('common.addToFavorites')}
                      >
                        <svg viewBox="0 0 24 24" fill={isFavorite(product.id) ? 'currentColor' : 'none'} stroke="currentColor">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="product-card__info">
                      <h3 className="product-card__name">{formatProductName(product.name)}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Couches Section */}
          <div className="products-section">
            <h3 className="products-section__title">{t('nav.couches')}</h3>
            <div className="new-arrivals__grid">
              {products.couches.map((product) => {
                const primaryImage = getProductImagePath(product.category, product.id, product.images[0]);
                return (
                  <Link 
                    key={product.id} 
                    to={`/${product.category}/${product.id}`}
                    className="product-card"
                  >
                    <div className="product-card__image-wrapper">
                      <img 
                        src={primaryImage} 
                        alt={formatProductName(product.name)} 
                        className="product-card__image"
                        loading="lazy"
                      />
                      <button
                        className={`product-card__favorite ${isFavorite(product.id) ? 'product-card__favorite--active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        aria-label={t('common.addToFavorites')}
                      >
                        <svg viewBox="0 0 24 24" fill={isFavorite(product.id) ? 'currentColor' : 'none'} stroke="currentColor">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="product-card__info">
                      <h3 className="product-card__name">{formatProductName(product.name)}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

