// ==========================================
// DATOS DE PRODUCTOS - JAVASCRIPT MODERNO
// ==========================================

export const productosIniciales = [
  { 
    id: 1, 
    nombre: 'iPhone 15 Pro', 
    precio: 999, 
    categoria: 'tecnologia',
    imagen: '📱', 
    descripcion: 'El último iPhone con chip A17 Pro',
    rating: 4.8,
    stock: 15
  },
  { 
    id: 2, 
    nombre: 'MacBook Air M2', 
    precio: 1299, 
    categoria: 'tecnologia',
    imagen: '💻', 
    descripcion: 'Laptop ultraligera con chip M2',
    rating: 4.9,
    stock: 8
  },
  { 
    id: 3, 
    nombre: 'Nike Air Max 270', 
    precio: 150, 
    categoria: 'calzado',
    imagen: '👟', 
    descripcion: 'Zapatillas deportivas cómodas',
    rating: 4.5,
    stock: 25
  },
  { 
    id: 4, 
    nombre: 'Samsung Galaxy S24', 
    precio: 899, 
    categoria: 'tecnologia',
    imagen: '📱', 
    descripcion: 'Smartphone Android de última generación',
    rating: 4.6,
    stock: 12
  },
  { 
    id: 5, 
    nombre: 'Adidas Ultraboost', 
    precio: 180, 
    categoria: 'calzado',
    imagen: '👟', 
    descripcion: 'Zapatillas de running de alto rendimiento',
    rating: 4.7,
    stock: 18
  },
  { 
    id: 6, 
    nombre: 'Camiseta Polo', 
    precio: 35, 
    categoria: 'ropa',
    imagen: '👕', 
    descripcion: 'Camiseta polo clásica de algodón',
    rating: 4.2,
    stock: 50
  }
];

// Categorías predefinidas
export const CATEGORIAS = {
  TECNOLOGIA: 'tecnologia',
  CALZADO: 'calzado',
  ROPA: 'ropa'
};

// Función para obtener producto por ID
export const obtenerProductoPorId = (productos, id) => {
  return productos.find(producto => producto.id === id);
};

// Función para obtener productos por categoría
export const obtenerProductosPorCategoria = (productos, categoria) => {
  if (categoria === 'todos') return productos;
  return productos.filter(producto => producto.categoria === categoria);
};