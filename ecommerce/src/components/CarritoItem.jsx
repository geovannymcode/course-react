import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import './CarritoItem.css';

// ==========================================
// COMPONENTE CARRITO ITEM - PROPS Y EVENTOS
// ==========================================

const CarritoItem = ({ item, onActualizar, onRemover }) => {
  // DESTRUCTURING de props
  const { id, nombre, precio, imagen, cantidad } = item;

  // EVENTOS - Arrow functions para manejar eventos
  const handleIncrementar = () => {
    onActualizar(id, cantidad + 1);
  };

  const handleDecrementar = () => {
    onActualizar(id, cantidad - 1);
  };

  const handleRemover = () => {
    if (window.confirm(`¿Quieres eliminar ${nombre} del carrito?`)) {
      onRemover(id);
    }
  };

  // Calcular subtotal
  const subtotal = precio * cantidad;

  return (
    <div className="carrito-item">
      <div className="item-info">
        <span className="item-imagen">{imagen}</span>
        <div className="item-detalles">
          <h4 className="item-nombre">{nombre}</h4>
          <p className="item-precio-unitario">${precio} c/u</p>
          <p className="item-subtotal">Subtotal: ${subtotal.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="item-controles">
        <div className="cantidad-controles">
          <button 
            onClick={handleDecrementar} 
            className="btn-cantidad"
            aria-label="Decrementar cantidad"
          >
            <Minus size={16} />
          </button>
          <span className="cantidad-display">{cantidad}</span>
          <button 
            onClick={handleIncrementar} 
            className="btn-cantidad"
            aria-label="Incrementar cantidad"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <button 
          onClick={handleRemover} 
          className="btn-eliminar"
          aria-label={`Eliminar ${nombre}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CarritoItem;