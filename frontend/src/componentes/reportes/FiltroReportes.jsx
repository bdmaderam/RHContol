// src/components/Reportes/FiltroReportes.jsx (Example structure)
import React from 'react';

const FiltroReportes = ({ filtros, onChange, onGenerarReporte }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Call the onChange prop (which is setFiltros from parent)
    // to update the filters state in ReporteEmpleados
    onChange(prevFiltros => ({
      ...prevFiltros,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-wrap gap-4 items-end">
      {/* Estado Filter (Activo/Inactivo/Todos) */}
      <div className="flex flex-col">
        <label htmlFor="estado" className="text-sm font-medium text-gray-700 mb-1">
          Estado:
        </label>
        <select
          id="estado"
          name="estado"
          value={filtros.estado}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="todos">Todos</option>
          <option value="activos">Activos</option>
          <option value="inactivos">Inactivos</option>
        </select>
      </div>

      {/* Departamento Filter */}
      <div className="flex flex-col">
        <label htmlFor="departamento" className="text-sm font-medium text-gray-700 mb-1">
          Departamento:
        </label>
        <input
          type="text"
          id="departamento"
          name="departamento"
          value={filtros.departamento}
          onChange={handleInputChange}
          placeholder="Ej: TI"
          className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Fecha Desde Filter */}
      <div className="flex flex-col">
        <label htmlFor="fechaDesde" className="text-sm font-medium text-gray-700 mb-1">
          Fecha Desde:
        </label>
        <input
          type="date"
          id="fechaDesde"
          name="fechaDesde"
          value={filtros.fechaDesde}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Fecha Hasta Filter */}
      <div className="flex flex-col">
        <label htmlFor="fechaHasta" className="text-sm font-medium text-gray-700 mb-1">
          Fecha Hasta:
        </label>
        <input
          type="date"
          id="fechaHasta"
          name="fechaHasta"
          value={filtros.fechaHasta}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Report Generation Buttons */}
      <div className="flex gap-2 mt-auto"> {/* mt-auto aligns buttons to the bottom */}
        <button
          onClick={() => onGenerarReporte('pdf')}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition duration-200"
        >
          Generar PDF
        </button>
        <button
          onClick={() => onGenerarReporte('excel')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm transition duration-200"
        >
          Generar Excel
        </button>
      </div>
    </div>
  );
};

export default FiltroReportes;