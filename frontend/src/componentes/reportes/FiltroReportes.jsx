import React from 'react';

const FiltroReportes = ({ filtros, onChange, onGenerarReporte }) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    onChange({
      ...filtros,
      [name]: value
    });
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            name="estado"
            value={filtros.estado}
            onChange={manejarCambio}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="todos">Todos</option>
            <option value="activos">Activos</option>
            <option value="inactivos">Inactivos</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
          <input
            type="text"
            name="departamento"
            value={filtros.departamento}
            onChange={manejarCambio}
            placeholder="Todos los departamentos"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
          <input
            type="date"
            name="fechaDesde"
            value={filtros.fechaDesde}
            onChange={manejarCambio}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
          <input
            type="date"
            name="fechaHasta"
            value={filtros.fechaHasta}
            onChange={manejarCambio}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={() => onGenerarReporte('pdf')}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
          </svg>
          Exportar PDF
        </button>
        <button
          onClick={() => onGenerarReporte('excel')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Exportar Excel
        </button>
      </div>
    </div>
  );
};

export default FiltroReportes;