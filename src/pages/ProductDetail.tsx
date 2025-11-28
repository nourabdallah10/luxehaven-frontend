import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getProductById, getProductImagePath } from '../data/products';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { category, productName } = useParams<{ category: string; productName: string }>();
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('1');
  const [openAccordion, setOpenAccordion] = useState<string | null>('dimensions');
  const [selectedColorImage, setSelectedColorImage] = useState<string | null>(null);

  // Get product from centralized data
  const product = useMemo(() => {
    if (!category || !productName) return null;
    return getProductById(productName, category);
  }, [category, productName]);

  // Generate image paths from product data
  const productImages = useMemo(() => {
    if (!product || !category) return [];
    return product.images.map(imageName => 
      getProductImagePath(category, product.id, imageName)
    );
  }, [product, category]);

  // Color swatches from /images/Colors/ folder
  const colorSwatches = useMemo(() => {
    return [
      { id: '1', image: '/images/Colors/1.jpg' },
      { id: '2', image: '/images/Colors/2.jpg' },
      { id: '3', image: '/images/Colors/3.jpg' },
      { id: '4', image: '/images/Colors/4.jpg' },
      { id: '5', image: '/images/Colors/5.jpg' },
      { id: '6', image: '/images/Colors/6.jpg' },
      { id: '7', image: '/images/Colors/7.jpg' },
    ];
  }, []);

  const formatProductName = (name: string): string => {
    return name;
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const openColorImage = (image: string) => {
    setSelectedColorImage(image);
  };

  const closeColorImage = () => {
    setSelectedColorImage(null);
  };

  if (!category || !productName || (category !== 'beds' && category !== 'couches') || !product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="product-detail__error">
            <h1>{t('product.error.title')}</h1>
            <p>{t('product.error.message')}</p>
            <Link to="/" className="btn">{t('product.error.return')}</Link>
          </div>
        </div>
      </div>
    );
  }

  const mainImage = productImages[selectedImageIndex] || productImages[0] || '';

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail__content">
          {/* Left Column - Image Gallery */}
          <div className="product-detail__gallery">
            <div className="product-detail__main-image">
              {mainImage && (
                <img 
                  src={mainImage} 
                  alt={formatProductName(product.name)} 
                  className="product-detail__main-img"
                  loading="eager"
                />
              )}
            </div>
            
            {/* Thumbnail Strip */}
            {productImages.length > 1 && (
              <div className="product-detail__thumbnails">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className={`product-detail__thumbnail ${selectedImageIndex === index ? 'product-detail__thumbnail--active' : ''}`}
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`${t('common.viewImage')} ${index + 1}`}
                  >
                    <img 
                      src={image} 
                      alt={`${formatProductName(product.name)} view ${index + 1}`}
                      className="product-detail__thumbnail-img"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="product-detail__info">
            <h1 className="product-detail__title">{formatProductName(product.name)}</h1>

            {/* Color Selector */}
            <div className="product-detail__color-selector">
              <label className="product-detail__color-label">{t('product.color')}</label>
              <div className="product-detail__color-swatches">
                {colorSwatches.map((color) => (
                  <button
                    key={color.id}
                    className={`product-detail__color-swatch ${selectedColor === color.id ? 'product-detail__color-swatch--active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedColor(color.id);
                      openColorImage(color.image);
                    }}
                    aria-label={`${t('common.selectColor')} ${color.id}`}
                  >
                    <img 
                      src={color.image} 
                      alt={`Color option ${color.id}`}
                      className="product-detail__color-img"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Customizable Notice */}
            <div className="product-detail__customizable">
              {t('product.customizable')}
            </div>

            {/* WhatsApp Contact */}
            <div className="product-detail__whatsapp">
              <a 
                href={`https://wa.me/972534210088`}
                target="_blank"
                rel="noopener noreferrer"
                className="product-detail__whatsapp-link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="product-detail__whatsapp-icon">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.98 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>{t('product.whatsapp')}</span>
              </a>
            </div>

            {/* Accordion */}
            <div className="product-detail__accordion">
              <div className="product-detail__accordion-item">
                <button
                  className={`product-detail__accordion-header ${openAccordion === 'dimensions' ? 'product-detail__accordion-header--open' : ''}`}
                  onClick={() => toggleAccordion('dimensions')}
                >
                  <span>{t('product.dimensions')}</span>
                  <svg 
                    className={`product-detail__accordion-icon ${openAccordion === 'dimensions' ? 'product-detail__accordion-icon--open' : ''}`}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {openAccordion === 'dimensions' && (
                  <div className="product-detail__accordion-content">
                    <ul className="product-detail__dimensions-list">
                      <li><strong>{t('product.dimensions.width')}:</strong> 84" (213 cm)</li>
                      <li><strong>{t('product.dimensions.depth')}:</strong> 36" (91 cm)</li>
                      <li><strong>{t('product.dimensions.height')}:</strong> 34" (86 cm)</li>
                      <li><strong>{t('product.dimensions.weight')}:</strong> 120 lbs (54 kg)</li>
                    </ul>
                    <p className="product-detail__dimensions-note">
                      {t('product.dimensions.customizable')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Image Modal */}
      {selectedColorImage && (
        <div className="color-modal" onClick={closeColorImage}>
          <div className="color-modal__content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="color-modal__close"
              onClick={closeColorImage}
              aria-label="Close image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <img 
              src={selectedColorImage} 
              alt="Color preview" 
              className="color-modal__image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

