import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation files
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.beds': 'Beds',
    'nav.couches': 'Couches',
    'nav.colors': 'Colors',
    'nav.favorites': 'Favorites',
    'nav.search': 'Search',
    'nav.account': 'Account',
    
    // Home Page
    'home.hero.title': 'Modern Comfort for Your Home',
    'home.hero.cta': 'Shop All Couches',
    'home.featured.title': 'Featured Categories',
    'home.newArrivals.title': 'New Arrivals',
    'home.customizable': 'High-quality wood, premium washable fabric, and you choose the size that fits your home. Every product can be customized to your exact specifications. Contact us via WhatsApp: +972534210088',
    
    // Colors Page
    'colors.title': 'Colors',
    'colors.subtitle': 'Browse our available color options',
    'colors.color': 'Color',
    'colors.category': 'Category',
    'colors.customizable': 'High-quality wood, premium washable fabric, and you choose the size that fits your home. All products are customizable according to your request. Contact us on WhatsApp: +972534210088',
    
    // Category Page
    'category.error.title': 'Category not found',
    'category.error.message': 'Please select a valid category.',
    'category.customizable': 'High-quality wood, premium washable fabric, and you choose the size that fits your home. All our products are fully customizable to match your preferences. Reach us on WhatsApp: +972534210088',
    
    // Product Detail
    'product.color': 'Color',
    'product.addToCart': 'Add to Cart',
    'product.customizable': 'High-quality wood, premium washable fabric, and you choose the size that fits your home. Customizable according to your request',
    'product.whatsapp': 'Contact us on WhatsApp at this number: +972534210088',
    'product.description': 'Description',
    'product.dimensions': 'Dimensions',
    'product.dimensions.width': 'Width',
    'product.dimensions.depth': 'Depth',
    'product.dimensions.height': 'Height',
    'product.dimensions.weight': 'Weight',
    'product.dimensions.customizable': 'Customizable according to your request',
    'product.error.title': 'Product not found',
    'product.error.message': 'Please select a valid product.',
    'product.error.return': 'Return to Home',
    'product.description.text': 'Experience ultimate comfort with our premium {product}. Crafted with attention to detail and quality materials, this piece combines style and functionality to enhance your living space. Perfect for modern homes seeking both elegance and practicality.',
    
    // Favorites
    'favorites.title': 'My Favorites',
    'favorites.removeAll': 'Remove All',
    'favorites.empty.title': 'No favorites yet',
    'favorites.empty.message': 'Start adding products to your favorites by clicking the heart icon on any product.',
    'favorites.empty.cta': 'Continue Shopping',
    'favorites.customizable': 'High-quality wood, premium washable fabric, and you choose the size that fits your home. Customize any of your favorite products to your liking. WhatsApp us at: +972534210088',
    
    // Common
    'common.addToFavorites': 'Add to favorites',
    'common.removeFromFavorites': 'Remove from favorites',
    'common.viewImage': 'View image',
    'common.selectColor': 'Select color',
    'common.qualityMessage': 'High-quality wood, premium washable fabric, and you choose the size that fits your home',
    
    // Footer
    'footer.connect': 'Connect with us',
    'footer.contact': 'Contact Us',
    'footer.copyright': 'Furniture Shop. All rights reserved.',
  },
  he: {
    // Navigation
    'nav.home': 'בית',
    'nav.beds': 'מיטות',
    'nav.couches': 'ספות',
    'nav.colors': 'צבעים',
    'nav.favorites': 'מועדפים',
    'nav.search': 'חיפוש',
    'nav.account': 'חשבון',
    
    // Home Page
    'home.hero.title': 'נוחות מודרנית לבית שלך',
    'home.hero.cta': 'קנה את כל הספות',
    'home.featured.title': 'קטגוריות מומלצות',
    'home.newArrivals.title': 'חדשים',
    'home.customizable': 'עץ באיכות גבוהה, בד פרמיום הניתן לכביסה, ואתה בוחר את הגודל שמתאים לבית שלך. כל מוצר ניתן להתאמה אישית לפי המפרט המדויק שלך. צור איתנו קשר דרך וואטסאפ: +972534210088',
    
    // Colors Page
    'colors.title': 'צבעים',
    'colors.subtitle': 'עיין באפשרויות הצבעים הזמינות שלנו',
    'colors.color': 'צבע',
    'colors.category': 'קטגוריה',
    'colors.customizable': 'עץ באיכות גבוהה, בד פרמיום הניתן לכביסה, ואתה בוחר את הגודל שמתאים לבית שלך. כל המוצרים ניתנים להתאמה אישית לפי בקשתך. צור איתנו קשר בוואטסאפ: +972534210088',
    
    // Category Page
    'category.error.title': 'קטגוריה לא נמצאה',
    'category.error.message': 'אנא בחר קטגוריה תקינה.',
    'category.customizable': 'עץ באיכות גבוהה, בד פרמיום הניתן לכביסה, ואתה בוחר את הגודל שמתאים לבית שלך. כל המוצרים שלנו ניתנים להתאמה מלאה לפי העדפותיך. פנה אלינו בוואטסאפ: +972534210088',
    
    // Product Detail
    'product.color': 'צבע',
    'product.addToCart': 'הוסף לעגלה',
    'product.customizable': 'עץ באיכות גבוהה, בד פרמיום הניתן לכביסה, ואתה בוחר את הגודל שמתאים לבית שלך. ניתן להתאמה אישית לפי בקשתך',
    'product.whatsapp': 'צור איתנו קשר בוואטסאפ במספר זה: +972534210088',
    'product.description': 'תיאור',
    'product.dimensions': 'מידות',
    'product.dimensions.width': 'רוחב',
    'product.dimensions.depth': 'עומק',
    'product.dimensions.height': 'גובה',
    'product.dimensions.weight': 'משקל',
    'product.dimensions.customizable': 'ניתן להתאמה אישית לפי בקשתך',
    'product.error.title': 'מוצר לא נמצא',
    'product.error.message': 'אנא בחר מוצר תקין.',
    'product.error.return': 'חזור לבית',
    'product.description.text': 'חווה נוחות מקסימלית עם ה{product} הפרמיום שלנו. מיוצר בקפידה עם תשומת לב לפרטים וחומרים איכותיים, החלק הזה משלב סגנון ופונקציונליות לשיפור המרחב החי שלך. מושלם לבתים מודרניים המחפשים אלגנטיות ומעשיות.',
    
    // Favorites
    'favorites.title': 'המועדפים שלי',
    'favorites.removeAll': 'הסר הכל',
    'favorites.empty.title': 'אין מועדפים עדיין',
    'favorites.empty.message': 'התחל להוסיף מוצרים למועדפים שלך על ידי לחיצה על סמל הלב בכל מוצר.',
    'favorites.empty.cta': 'המשך לקנות',
    'favorites.customizable': 'עץ באיכות גבוהה, בד פרמיום הניתן לכביסה, ואתה בוחר את הגודל שמתאים לבית שלך. התאם אישית כל אחד מהמוצרים המועדפים שלך לטעמך. שלח לנו הודעה בוואטסאפ: +972534210088',
    
    // Common
    'common.addToFavorites': 'הוסף למועדפים',
    'common.removeFromFavorites': 'הסר ממועדפים',
    'common.viewImage': 'הצג תמונה',
    'common.selectColor': 'בחר צבע',
    'common.qualityMessage': 'עץ באיכות גבוהה, בד פרמיום הניתן לכביסה, ואתה בוחר את הגודל שמתאים לבית שלך',
    
    // Footer
    'footer.connect': 'התחבר אלינו',
    'footer.contact': 'צור קשר',
    'footer.copyright': 'חנות רהיטים. כל הזכויות שמורות.',
  },
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load from localStorage or default to English
    const saved = localStorage.getItem('language') as Language;
    return saved && (saved === 'en' || saved === 'he') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Initialize dir and lang on mount
  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'he';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

