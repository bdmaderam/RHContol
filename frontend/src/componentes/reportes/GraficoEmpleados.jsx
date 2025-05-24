import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoEmpleados = ({ datos }) => {
  const data = {
    labels: datos.map(item => item.nombre),
    datasets: [
      {
        data: datos.map(item => item.cantidad),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#8B5CF6',
          '#F59E0B',
          '#EF4444',
          '#EC4899'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };

  return (
    <div className="h-64 md:h-80">
      <Pie data={data} options={options} />
    </div>
  );
};

export default GraficoEmpleados;