export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: 'beds' | 'couches';
}

export interface ProductsData {
  beds: Product[];
  couches: Product[];
}

export const products: ProductsData = {
  beds: [
    { 
      id: 'BedProduct1', 
      name: 'Wavy Upholstered Bed Frame', 
      price: 899, 
      images: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'], 
      category: 'beds' 
    },
    { 
      id: 'BedProduct2', 
      name: 'Classic Bed Frame', 
      price: 799, 
      images: ['1.png', '2.png', '3.png'], 
      category: 'beds' 
    },
    { 
      id: 'BedProduct3', 
      name: 'Boucle Bed Frame', 
      price: 699, 
      images: ['1.png', '2.png'], 
      category: 'beds' 
    },
    { 
      id: 'BedProduct4', 
      name: 'Contemporary Bed Frame', 
      price: 849, 
      images: ['1.png', '2.png'], 
      category: 'beds' 
    },
    { 
      id: 'BedProduct5', 
      name: 'Elegant Bed Frame', 
      price: 749, 
      images: ['1.png', '2.png'], 
      category: 'beds' 
    },
  ],
  couches: [
    { 
      id: 'CouchProduct1', 
      name: 'Luxury Sofa', 
      price: 1299, 
      images: ['1.png', '2.png', '3.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct2', 
      name: 'Modular Couch', 
      price: 899, 
      images: ['1.png', '2.png', '3.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct3', 
      name: 'Comfort Sectional', 
      price: 1499, 
      images: ['1.png', '2.png', '3.png', '4.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct4', 
      name: 'Deep-Seated Sectional Couch', 
      price: 1099, 
      images: ['1.png', '2.png', '3.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct5', 
      name: 'Contemporary Couch', 
      price: 999, 
      images: ['1.png', '2.png', '3.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct6', 
      name: 'Modular Corduroy Sofa', 
      price: 1199, 
      images: ['1.png', '2.png', '3.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct7', 
      name: 'The Mags Sofa', 
      price: 799, 
      images: ['1.png', '2.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct8', 
      name: 'Premium Sectional', 
      price: 1599, 
      images: ['1.png', '2.png', '3.png', '4.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct9', 
      name: 'Stylish Sofa', 
      price: 949, 
      images: ['1.png', '2.png', '3.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct10', 
      name: 'Modern Sectional', 
      price: 1399, 
      images: ['1.png', '2.png', '3.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct11', 
      name: 'Cozy Couch', 
      price: 1049, 
      images: ['1.png', '2.png', '3.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct12', 
      name: 'Dark Green Corduroy Couch', 
      price: 849, 
      images: ['1.png', '2.png', '3.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct13', 
      name: 'Square-arm Leather Sofa', 
      price: 1349, 
      images: ['1.png', '2.png', '3.png', '4.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct14', 
      name: 'Premium Couch', 
      price: 1249, 
      images: ['1.png', '2.png', '3.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct15', 
      name: 'L-Shaped Modular Sofa', 
      price: 749, 
      images: ['1.png', '2.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct16', 
      name: 'The Harmony Modular Couch', 
      price: 799, 
      images: ['1.png', '2.png'], 
      category: 'couches' 
    },
    { 
      id: 'CouchProduct17', 
      name: 'Comfortable Sofa', 
      price: 1149, 
      images: ['1.png', '2.png', '3.png'], 
      category: 'couches' 
    },
  ],
};

// Helper function to get product image path
export const getProductImagePath = (category: string, productId: string, imageName: string): string => {
  // Capitalize first letter to match folder names
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  return `/images/${capitalizedCategory}/${productId}/${imageName}`;
};

// Helper function to get all products as a flat array
export const getAllProducts = (): Product[] => {
  return [...products.beds, ...products.couches];
};

// Helper function to get product by ID
export const getProductById = (id: string, category?: string): Product | undefined => {
  if (category) {
    const categoryProducts = products[category as keyof ProductsData];
    return categoryProducts.find(p => p.id === id);
  }
  return getAllProducts().find(p => p.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category: 'beds' | 'couches'): Product[] => {
  return products[category];
};

