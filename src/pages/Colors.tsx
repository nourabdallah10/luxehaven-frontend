import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Colors.css';
import '../styles/customizable-notice.css';

const Colors: React.FC = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Color images from /images/Colors/ folder
  const colors = [
    { id: '1', image: '/images/Colors/1.jpg' },
    { id: '2', image: '/images/Colors/2.jpg' },
    { id: '3', image: '/images/Colors/3.jpg' },
    { id: '4', image: '/images/Colors/4.jpg' },
    { id: '5', image: '/images/Colors/5.jpg' },
    { id: '6', image: '/images/Colors/6.jpg' },
    { id: '7', image: '/images/Colors/7.jpg' },
  ];

  const openImage = (image: string) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="colors">
      {/* Banner Section */}
      <section className="colors__banner">
        <div className="container">
          <h1 className="colors__title">{t('colors.title') || 'Colors'}</h1>
          <p className="colors__subtitle">{t('colors.subtitle') || 'Browse our available color options'}</p>
        </div>
      </section>

      {/* Customizable Notice */}
      <section className="customizable-notice">
        <div className="container">
          <div className="customizable-notice__content">
            <svg className="customizable-notice__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <p className="customizable-notice__text">{t('colors.customizable')}</p>
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

      {/* Colors Grid */}
      <section className="colors__grid-section">
        <div className="container">
          <div className="colors__grid">
            {colors.map((color) => (
              <div 
                key={color.id} 
                className="color-card"
                onClick={() => openImage(color.image)}
              >
                <div className="color-card__image-wrapper">
                  <img
                    src={color.image}
                    alt={`Color option ${color.id}`}
                    className="color-card__image"
                    loading="lazy"
                  />
                </div>
                <div className="color-card__info">
                  <h3 className="color-card__name">{t('colors.category') || 'Category'} {color.id}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="color-modal" onClick={closeImage}>
          <div className="color-modal__content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="color-modal__close"
              onClick={closeImage}
              aria-label="Close image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <img 
              src={selectedImage} 
              alt="Color preview" 
              className="color-modal__image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Colors;

