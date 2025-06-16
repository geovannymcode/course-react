// src/components/ProductoCard.jsx
import React from 'react';
import { Plus, Star } from 'lucide-react';
import './ProductoCard.css';

// ==========================================
// COMPONENTE PRODUCTO - DESTRUCTURING Y PROPS
// ==========================================

const ProductoCard = ({ producto, onAgregar }) => {
  // DESTRUCTURING - Extraemos propiedades del objeto producto
  const { id, nombre, precio, imagen, descripcion, rating, stock } = producto;
  
  // EVENTOS - Función para manejar click
  const handleAgregar = () => {
    onAgregar(producto);
  };

  return (
    <div className="producto-card">
      <div className="producto-imagen">
        <div className="producto-emoji">{imagen}</div>
        <h3 className="producto-titulo">{nombre}</h3>
        <p className="producto-descripcion">{descripcion}</p>
      </div>
      
      <div className="producto-rating">
        <div className="rating">
          <Star className="star-icon" />
          <span>{rating}</span>
        </div>
        <span className="separador">•</span>
        <span className="stock-info">Stock: {stock}</span>
      </div>
      
      <div className="producto-footer">
        <span className="producto-precio">${precio}</span>
        <button
          onClick={handleAgregar}
          className={`btn-agregar ${stock === 0 ? 'disabled' : ''}`}
          disabled={stock === 0}
        >
          <Plus size={16} />
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductoCard;