// src/components/Filtros.jsx
import React from 'react';
import { Filter } from 'lucide-react';
import { capitalizarPrimeraLetra } from '../utils/helpers';
import './Filtros.css';

// ==========================================
// COMPONENTE FILTROS - EVENTOS Y PROPS
// ==========================================

const Filtros = ({ 
  busqueda, 
  setBusqueda, 
  filtroCategoria, 
  setFiltroCategoria, 
  categorias 
}) => {
  // EVENTOS - Manejadores de eventos
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setFiltroCategoria(e.target.value);
  };

  return (
    <div className="filtros-container">
      <div className="filtros-content">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={handleBusquedaChange}
          className="input-busqueda"
        />
        
        <div className="filtro-categoria">
          <Filter size={20} className="filter-icon" />
          <select
            value={filtroCategoria}
            onChange={handleCategoriaChange}
            className="select-categoria"
          >
            {/* RENDERIZADO DE LISTAS - map() */}
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {capitalizarPrimeraLetra(categoria)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filtros;