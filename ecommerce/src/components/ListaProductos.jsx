import React from 'react';
import ProductoCard from './ProductoCard';
import './ListaProductos.css';

// ==========================================
// COMPONENTE LISTA PRODUCTOS - RENDERIZADO DE LISTAS
// ==========================================

const ListaProductos = ({ productos, onAgregar }) => {
  return (
    <div className="productos-grid">
      {/* RENDERIZADO DE LISTAS con map() y key prop */}
      {productos.map(producto => (
        <ProductoCard 
          key={producto.id} 
          producto={producto} 
          onAgregar={onAgregar} 
        />
      ))}
    </div>
  );
};

export default ListaProductos;