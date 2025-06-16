import React from 'react';
import { ShoppingCart } from 'lucide-react';
import CarritoItem from './CarritoItem';
import { calcularPrecioTotal } from '../utils/helpers';
import './Carrito.css';

// ==========================================
// COMPONENTE CARRITO - ESTADO Y COMUNICACIÓN
// ==========================================

const Carrito = ({ 
  carrito, 
  onActualizar, 
  onRemover, 
  onVaciar, 
  onContinuar, 
  onProcesar 
}) => {
  // JAVASCRIPT MODERNO - usar helper para calcular total
  const totalPrecio = calcularPrecioTotal(carrito);

  // RENDERIZADO CONDICIONAL - Carrito vacío
  if (carrito.length === 0) {
    return (
      <div className="carrito-container">
        <h2 className="carrito-titulo">Carrito de Compras</h2>
        <div className="carrito-vacio">
          <ShoppingCart size={64} className="carrito-vacio-icon" />
          <p className="carrito-vacio-texto">Tu carrito está vacío</p>
          <button 
            onClick={onContinuar} 
            className="btn-continuar-compras"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  // EVENTOS - Manejadores de eventos
  const handleVaciarCarrito = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      onVaciar();
    }
  };

  const handleProcesarOrden = () => {
    if (carrito.length === 0) return;
    onProcesar();
  };

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Carrito de Compras</h2>
      
      <div className="carrito-items">
        {/* RENDERIZADO DE LISTAS - map() en el carrito */}
        {carrito.map(item => (
          <CarritoItem 
            key={item.id} 
            item={item} 
            onActualizar={onActualizar}
            onRemover={onRemover}
          />
        ))}
      </div>
      
      <div className="carrito-resumen">
        <div className="carrito-total-header">
          <span className="carrito-total-precio">
            Total: ${totalPrecio.toFixed(2)}
          </span>
          <button 
            onClick={handleVaciarCarrito} 
            className="btn-vaciar-carrito"
          >
            Vaciar Carrito
          </button>
        </div>
        
        <div className="carrito-botones">
          <button
            onClick={onContinuar}
            className="btn-continuar"
          >
            Continuar Comprando
          </button>
          <button
            onClick={handleProcesarOrden}
            className="btn-procesar-orden"
          >
            Procesar Orden
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;