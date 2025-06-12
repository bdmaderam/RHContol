import React, { useState } from 'react'; // Añade esta línea

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
    <div className="filtro-empleados">
      <form onSubmit={manejarEnvio}>
        {/* Tus campos de filtro aquí */}
        <input
          type="text"
          name="documento"
          value={filtrosLocales.documento}
          onChange={manejarCambio}
          placeholder="Número de documento"
        />
        
        <button type="submit">Buscar</button>
        <button type="button" onClick={limpiarFiltros}>Limpiar</button>
      </form>
    </div>
  );
};

export default FiltroEmpleados;