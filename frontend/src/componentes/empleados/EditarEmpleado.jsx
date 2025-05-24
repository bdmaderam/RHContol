import React, { useState } from 'react';

const FiltroEmpleados = ({ filtros, onChange }) => {
  const [filtrosLocales, setFiltrosLocales] = useState(filtros);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setFiltrosLocales({
      ...filtrosLocales,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    onChange(filtrosLocales);
  };

  const limpiarFiltros = () => {
    const filtrosLimpios = {
      documento: '',
      nombre: '',
      activos: true
    };
    setFiltrosLocales(filtrosLimpios);
    onChange(filtrosLimpios);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      {/* Resto del código del componente... */}
    </div>
  );
};

export default FiltroEmpleados;