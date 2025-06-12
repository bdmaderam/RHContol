import React from 'react';

const TarjetaResumen = ({ titulo, valor, icono, color, onClick }) => {
  const colores = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    orange: 'bg-orange-100 text-orange-800',
    red: 'bg-red-100 text-red-800'
  };

  return (
    <div 
      onClick={onClick}
      className={`${colores[color] || colores.blue} rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
        onClick ? 'hover:opacity-90' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium">{titulo}</p>
          <p className="text-2xl font-bold mt-1">{valor}</p>
        </div>
        <span className="text-2xl">{icono}</span>
      </div>
    </div>
  );
};

export default TarjetaResumen;