import React from 'react';
import { useNavigate } from 'react-router-dom';

const UltimasAnotaciones = ({ anotaciones }) => {
  const navigate = useNavigate();

  if (anotaciones.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
                  <header className="panel-header">
        <div className="usuario-info">
        
          <div className='titulo'>
            <h1>RHCONTROL</h1><br /><br />

          </div>
        </div>
      </header>
        No hay anotaciones recientes
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {anotaciones.map(anotacion => (
        <div 
          key={anotacion.id} 
          className="border-b border-gray-200 pb-3 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded cursor-pointer"
          onClick={() => navigate(`/empleados/${anotacion.id}/anotaciones`)}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{anotacion.empleado}</p>
              <p className="text-sm text-gray-600">{anotacion.descripcion}</p>
            </div>
            <div className="text-right">
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                anotacion.tipo === 'Reconocimiento' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {anotacion.tipo}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(anotacion.fecha).toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UltimasAnotaciones;