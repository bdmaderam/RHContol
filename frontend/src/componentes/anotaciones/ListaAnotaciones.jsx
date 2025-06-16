import React, { useState, useEffect } from 'react';
import Alerta from '../ui/Alerta';
import './lista.css';

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
            descripcion: 'Llegada tardía repetida sin justificación válida',
            creadoPor: 'Admin'
          },
          {
            id: 2,
            tipo: 'Reconocimiento',
            fecha: '2023-04-15',
            descripcion: 'Excelente desempeño en el proyecto X, entregando resultados antes del plazo',
            creadoPor: 'Gerente de Proyecto'
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
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getBadgeClass = (tipo) => {
    switch(tipo.toLowerCase()) {
      case 'llamado de atención':
        return 'badge badge-llamado';
      case 'reconocimiento':
        return 'badge badge-reconocimiento';
      default:
        return 'badge badge-general';
    }
  };

  if (cargando) {
    return <div className="loading-message">Cargando anotaciones...</div>;
  }

  return (
    <div className="lista-anotaciones-container">
                <header className="panel-header">
        <div className="usuario-info">
        
          <div className='titulo'>
            <h1>RHCONTROL</h1><br /><br />

          </div>
        </div>
      </header>
      {errores.length > 0 && (
        <Alerta tipo="error" mensajes={errores} onCerrar={() => setErrores([])} />
      )}

      {anotaciones.length > 0 ? (
        <table className="anotaciones-table">
          <thead className="table-header">
            <tr>
              <th>Tipo</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Registrado por</th>
            </tr>
          </thead>
          <tbody>
            {anotaciones.map((anotacion) => (
              <tr key={anotacion.id} className="table-row">
                <td className="tipo-cell">
                  <span className={getBadgeClass(anotacion.tipo)}>
                    {anotacion.tipo}
                  </span>
                </td>
                <td className="fecha-cell">
                  {formatearFecha(anotacion.fecha)}
                </td>
                <td className="descripcion-cell">
                  {anotacion.descripcion}
                </td>
                <td className="creado-por-cell">
                  {anotacion.creadoPor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-message">
          No se encontraron anotaciones para este empleado
        </div>
      )}
    </div>
  );
};

export default ListaAnotaciones;