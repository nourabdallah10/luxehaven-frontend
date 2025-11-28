import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { getProductsByCategory, getProductImagePath } from '../data/products';
import './Category.css';
import '../styles/customizable-notice.css';

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useLanguage();

  const formatProductName = (name: string): string => {
    return name;
  };

  // Get all products for the category
  const allProducts = useMemo(() => {
    if (category === 'beds' || category === 'couches') {
      return getProductsByCategory(category);
    }
    return [];
  }, [category]);

  const categoryName = category === 'beds' ? t('nav.beds') : category === 'couches' ? t('nav.couches') : '';

  if (!category || (category !== 'beds' && category !== 'couches')) {
    return (
      <div className="category">
        <div className="container">
          <div className="category__error">
            <h1>{t('category.error.title')}</h1>
            <p>{t('category.error.message')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category">
      {/* Banner Section */}
      <section className="category__banner">
        <div className="container">
          <h1 className="category__title">{categoryName}</h1>
        </div>
      </section>

      {/* Customizable Notice */}
      <section className="customizable-notice">
        <div className="container">
          <div className="customizable-notice__content">
            <svg className="customizable-notice__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <p className="customizable-notice__text">{t('category.customizable')}</p>
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

      {/* Products Grid */}
      <section className="category__products">
        <div className="container">
          <div className="category__grid">
            {allProducts.map((product) => {
              const primaryImage = getProductImagePath(product.category, product.id, product.images[0]);
              return (
                <Link 
                  key={product.id} 
                  to={`/${category}/${product.id}`}
                  className="category-product-card"
                >
                  <div className="category-product-card__image-wrapper">
                    <img 
                      src={primaryImage} 
                      alt={formatProductName(product.name)} 
                      className="category-product-card__image"
                      loading="lazy"
                    />
                    <button
                      className={`category-product-card__favorite ${isFavorite(product.id) ? 'category-product-card__favorite--active' : ''}`}
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
                  <div className="category-product-card__info">
                    <h3 className="category-product-card__name">{formatProductName(product.name)}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;

