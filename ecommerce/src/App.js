import React, { useState } from 'react';
import Header from './components/Header';
import Filtros from './components/Filtros';
import ListaProductos from './components/ListaProductos';
import Carrito from './components/Carrito';
import MensajeExito from './components/MensajeExito';
import { productosIniciales } from './data/productos';
import { 
  obtenerCategorias, 
  filtrarProductos, 
  calcularTotalProductos 
} from './utils/helpers';
import './App.css';

function App() {
  // ==========================================
  // MANEJO DE ESTADO CON useState
  // ==========================================
  
  const [productos] = useState(productosIniciales);
  const [carrito, setCarrito] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [vistaCarrito, setVistaCarrito] = useState(false);
  const [ordenCompletada, setOrdenCompletada] = useState(false);

  // ==========================================
  // LÓGICA DE NEGOCIO CON HELPERS
  // ==========================================
  
  const categorias = obtenerCategorias(productos);
  const productosFiltrados = filtrarProductos(productos, busqueda, filtroCategoria);
  const totalProductos = calcularTotalProductos(carrito);

  // ==========================================
  // FUNCIONES CON ARROW FUNCTIONS
  // ==========================================
  
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

  const vaciarCarrito = () => setCarrito([]);

  const toggleVistaCarrito = () => setVistaCarrito(!vistaCarrito);

  const procesarOrden = () => {
    if (carrito.length === 0) return;
    
    setTimeout(() => {
      setOrdenCompletada(true);
      setCarrito([]);
      setVistaCarrito(false);
      
      setTimeout(() => setOrdenCompletada(false), 3000);
    }, 1000);
  };

  // ==========================================
  // JSX CON RENDERIZADO CONDICIONAL
  // ==========================================
  
  return (
    <div className="app">
      <Header 
        totalProductos={totalProductos}
        onToggleCarrito={toggleVistaCarrito}
      />

      <MensajeExito 
        visible={ordenCompletada}
        mensaje="¡Orden procesada exitosamente!"
      />

      <div className="main-content">
        {vistaCarrito ? (
          <Carrito 
            carrito={carrito}
            onActualizar={actualizarCantidad}
            onRemover={removerDelCarrito}
            onVaciar={vaciarCarrito}
            onContinuar={() => setVistaCarrito(false)}
            onProcesar={procesarOrden}
          />
        ) : (
          <>
            <Filtros 
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              filtroCategoria={filtroCategoria}
              setFiltroCategoria={setFiltroCategoria}
              categorias={categorias}
            />

            <ListaProductos 
              productos={productosFiltrados}
              onAgregar={agregarAlCarrito}
            />

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