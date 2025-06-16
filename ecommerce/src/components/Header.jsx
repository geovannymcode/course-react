import React from 'react';
import { ShoppingCart } from 'lucide-react';
import './Header.css';

// ==========================================
// COMPONENTE HEADER - COMUNICACIÓN CON PROPS
// ==========================================

const Header = ({ totalProductos, onToggleCarrito }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">🛍️ Mi Tienda React</h1>
        
        <button
          onClick={onToggleCarrito}
          className="btn-carrito"
        >
          <ShoppingCart size={20} />
          Carrito ({totalProductos})
          {totalProductos > 0 && (
            <span className="carrito-badge">{totalProductos}</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;