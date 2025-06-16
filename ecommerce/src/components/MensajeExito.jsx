import React from 'react';
import { CheckCircle } from 'lucide-react';
import './MensajeExito.css';

// ==========================================
// COMPONENTE MENSAJE ÉXITO - RENDERIZADO CONDICIONAL
// ==========================================

const MensajeExito = ({ visible, mensaje, tipo = 'success' }) => {
  // RENDERIZADO CONDICIONAL - Solo mostrar si visible es true
  if (!visible) return null;

  // Definir estilos según el tipo de mensaje
  const tipoClases = {
    success: 'mensaje-exito',
    error: 'mensaje-error',
    warning: 'mensaje-warning',
    info: 'mensaje-info'
  };

  const iconos = {
    success: <CheckCircle size={20} />,
    error: <CheckCircle size={20} />,
    warning: <CheckCircle size={20} />,
    info: <CheckCircle size={20} />
  };

  return (
    <div className={`mensaje-flotante ${tipoClases[tipo]}`}>
      <div className="mensaje-contenido">
        <span className="mensaje-icono">
          {iconos[tipo]}
        </span>
        <span className="mensaje-texto">
          {mensaje}
        </span>
      </div>
    </div>
  );
};

export default MensajeExito;