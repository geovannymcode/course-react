import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Star, Filter } from 'lucide-react';
import './App.css';

// Datos de productos simulados
const productosIniciales = [
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

function App() {
  // Estados principales
  const [productos] = useState(productosIniciales);
  const [carrito, setCarrito] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [vistaCarrito, setVistaCarrito] = useState(false);
  const [ordenCompletada, setOrdenCompletada] = useState(false);

  // Obtener categorías únicas
  const categorias = ['todos', ...new Set(productos.map(p => p.categoria))];

  // Filtrar productos
  const productosFiltrados = productos.filter(producto => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = filtroCategoria === 'todos' || producto.categoria === filtroCategoria;
    return coincideBusqueda && coincideCategoria;
  });

  // Funciones del carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(carritoActual => {
      const productoExistente = carritoActual.find(item => item.id === producto.id);
      
      if (productoExistente) {
        return carritoActual.map(item =>
          item.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }
    });
  };

  const removerDelCarrito = (productId) => {
    setCarrito(carritoActual => 
      carritoActual.filter(item => item.id !== productId)
    );
  };

  const actualizarCantidad = (productId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removerDelCarrito(productId);
      return;
    }
    
    setCarrito(carritoActual =>
      carritoActual.map(item =>
        item.id === productId 
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calcular totales
  const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
  const totalPrecio = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  // Procesar orden
  const procesarOrden = () => {
    if (carrito.length === 0) return;
    
    setTimeout(() => {
      setOrdenCompletada(true);
      setCarrito([]);
      setVistaCarrito(false);
      
      setTimeout(() => {
        setOrdenCompletada(false);
      }, 3000);
    }, 1000);
  };

  // Componente de Producto
  const ProductoCard = ({ producto }) => (
    <div className="producto-card">
      <div className="producto-imagen">
        <div className="emoji">{producto.imagen}</div>
        <h3>{producto.nombre}</h3>
        <p className="descripcion">{producto.descripcion}</p>
      </div>
      
      <div className="producto-rating">
        <div className="rating">
          <Star className="star" />
          <span>{producto.rating}</span>
        </div>
        <span className="separador">•</span>
        <span className="stock">Stock: {producto.stock}</span>
      </div>
      
      <div className="producto-footer">
        <span className="precio">${producto.precio}</span>
        <button
          onClick={() => agregarAlCarrito(producto)}
          className="btn-agregar"
          disabled={producto.stock === 0}
        >
          <Plus size={16} />
          Agregar
        </button>
      </div>
    </div>
  );

  // Componente del Carrito
  const CarritoItem = ({ item }) => (
    <div className="carrito-item">
      <div className="item-info">
        <span className="item-emoji">{item.imagen}</span>
        <div>
          <h4>{item.nombre}</h4>
          <p>${item.precio} c/u</p>
        </div>
      </div>
      
      <div className="item-controles">
        <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)} className="btn-cantidad">
          <Minus size={16} />
        </button>
        <span className="cantidad">{item.cantidad}</span>
        <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)} className="btn-cantidad">
          <Plus size={16} />
        </button>
        <button onClick={() => removerDelCarrito(item.id)} className="btn-eliminar">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>🛍️ Mi Tienda E-commerce</h1>
          
          <button
            onClick={() => setVistaCarrito(!vistaCarrito)}
            className="btn-carrito"
          >
            <ShoppingCart size={20} />
            Carrito ({totalProductos})
            {totalProductos > 0 && (
              <span className="badge">{totalProductos}</span>
            )}
          </button>
        </div>
      </header>

      {/* Mensaje de orden completada */}
      {ordenCompletada && (
        <div className="mensaje-exito">
          ✅ ¡Orden procesada exitosamente!
        </div>
      )}

      <div className="main-content">
        {vistaCarrito ? (
          /* Vista del Carrito */
          <div className="carrito-container">
            <h2>Carrito de Compras</h2>
            
            {carrito.length === 0 ? (
              <div className="carrito-vacio">
                <ShoppingCart size={64} className="carrito-vacio-icon" />
                <p>Tu carrito está vacío</p>
                <button
                  onClick={() => setVistaCarrito(false)}
                  className="btn-continuar"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <>
                <div className="carrito-items">
                  {carrito.map(item => (
                    <CarritoItem key={item.id} item={item} />
                  ))}
                </div>
                
                <div className="carrito-total">
                  <div className="total-header">
                    <span className="total-precio">Total: ${totalPrecio.toFixed(2)}</span>
                    <button onClick={vaciarCarrito} className="btn-vaciar">
                      Vaciar Carrito
                    </button>
                  </div>
                  
                  <div className="botones-carrito">
                    <button
                      onClick={() => setVistaCarrito(false)}
                      className="btn-continuar-gris"
                    >
                      Continuar Comprando
                    </button>
                    <button
                      onClick={procesarOrden}
                      className="btn-procesar"
                    >
                      Procesar Orden
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Vista de Productos */
          <>
            {/* Filtros */}
            <div className="filtros-container">
              <div className="filtros-content">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="input-busqueda"
                />
                
                <div className="filtro-categoria">
                  <Filter size={20} />
                  <select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    className="select-categoria"
                  >
                    {categorias.map(categoria => (
                      <option key={categoria} value={categoria}>
                        {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Grid de Productos */}
            <div className="productos-grid">
              {productosFiltrados.map(producto => (
                <ProductoCard key={producto.id} producto={producto} />
              ))}
            </div>

            {productosFiltrados.length === 0 && (
              <div className="no-productos">
                <p>No se encontraron productos</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;