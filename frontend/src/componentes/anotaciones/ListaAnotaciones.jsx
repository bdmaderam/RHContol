import React, { useState, useEffect } from 'react';
import Alerta from '../ui/Alerta';

const ListaAnotaciones = ({ empleadoId }) => {
  const [anotaciones, setAnotaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState([]);

  useEffect(() => {
    const cargarAnotaciones = async () => {
      try {
        // Simulación de datos - en producción sería una llamada a la API
        const datosEjemplo = [
          {
            id: 1,
            tipo: 'Llamado de atención',
            fecha: '2023-05-10',
            descripcion: 'Llegada tardía repetida',
            creadoPor: 'Admin'
          },
          {
            id: 2,
            tipo: 'Reconocimiento',
            fecha: '2023-04-15',
            descripcion: 'Excelente desempeño en el proyecto X',
            creadoPor: 'Gerente'
          }
        ];
        
        setAnotaciones(datosEjemplo);
      } catch (error) {
        setErrores(['Error al cargar las anotaciones']);
      } finally {
        setCargando(false);
      }
    };

    cargarAnotaciones();
  }, [empleadoId]);

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  if (cargando) {
    return <div className="text-center py-4">Cargando anotaciones...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {errores.length > 0 && (
        <Alerta tipo="error" mensajes={errores} onCerrar={() => setErrores([])} />
      )}

      {anotaciones.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registrado por
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {anotaciones.map((anotacion) => (
              <tr key={anotacion.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {anotacion.tipo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatearFecha(anotacion.fecha)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {anotacion.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {anotacion.creadoPor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No se encontraron anotaciones para este empleado
        </div>
      )}
    </div>
  );
};

export default ListaAnotaciones;