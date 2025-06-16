// ==========================================
// FUNCIONES HELPER - JAVASCRIPT MODERNO
// ==========================================

// ARROW FUNCTIONS y ARRAY METHODS

// Obtener categorías únicas usando Set y spread operator
export const obtenerCategorias = (productos) => {
  return ['todos', ...new Set(productos.map(p => p.categoria))];
};

// Filtrar productos usando filter() y métodos de string
export const filtrarProductos = (productos, busqueda, categoria) => {
  return productos.filter(producto => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === 'todos' || producto.categoria === categoria;
    return coincideBusqueda && coincideCategoria;
  });
};

// Calcular total de productos usando reduce()
export const calcularTotalProductos = (carrito) => {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
};

// Calcular precio total usando reduce()
export const calcularPrecioTotal = (carrito) => {
  return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
};

// Buscar producto en carrito usando find()
export const buscarProductoEnCarrito = (carrito, productId) => {
  return carrito.find(item => item.id === productId);
};

// Formatear precio con símbolo de moneda
export const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD'
  }).format(precio);
};

// Verificar si hay stock disponible
export const tieneStock = (producto) => {
  return producto.stock > 0;
};

// Obtener productos con bajo stock (menos de 5)
export const obtenerProductosBajoStock = (productos) => {
  return productos.filter(producto => producto.stock < 5 && producto.stock > 0);
};

// Ordenar productos por precio
export const ordenarPorPrecio = (productos, ascendente = true) => {
  return [...productos].sort((a, b) => {
    return ascendente ? a.precio - b.precio : b.precio - a.precio;
  });
};

// Ordenar productos por rating
export const ordenarPorRating = (productos, ascendente = false) => {
  return [...productos].sort((a, b) => {
    return ascendente ? a.rating - b.rating : b.rating - a.rating;
  });
};

// Capitalizar primera letra
export const capitalizarPrimeraLetra = (texto) => {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

// Validar email (para futuras funcionalidades)
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Generar ID único (simple)
export const generarId = () => {
  return Date.now() + Math.random();
};