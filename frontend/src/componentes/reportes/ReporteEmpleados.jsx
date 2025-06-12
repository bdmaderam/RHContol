import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerta from '../ui/Alerta';
import { generarPDF, generarExcel } from '../../utilidades/generadorReportes';

const ReporteEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState([]);
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:3001';

  const fetchEmpleados = async () => {
    setCargando(true);
    setErrores([]);

    try {
      const url = `${API_BASE_URL}/api/empleados`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cargar los empleados del servidor.');
      }

      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setErrores([error.message || 'Error de conexión con el servidor.']);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const manejarGenerarReporte = (formato) => {
    switch(formato) {
      case 'pdf':
        generarPDF(empleados, 'reporte_empleados_todos');
        break;
      case 'excel':
        generarExcel(empleados, 'reporte_empleados_todos');
        break;
      default:
        break;
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  const formatearMoneda = (valor) => {
    if (typeof valor !== 'number') return '';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(valor);
  };

  if (cargando) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="reporte-empleados-container">
      <h1 className="reporte-title">Reporte Completo de Empleados</h1>
      
      {errores.length > 0 && (
        <Alerta tipo="error" mensajes={errores} onCerrar={() => setErrores([])} />
      )}

      <div className="export-buttons">
        <button
          onClick={() => manejarGenerarReporte('pdf')}
          className="export-button pdf-button"
        >
          Generar PDF
        </button>
        <button
          onClick={() => manejarGenerarReporte('excel')}
          className="export-button excel-button"
        >
          Generar Excel
        </button>
      </div>

      <div className="table-container">
        <table className="empleados-table">
          <thead className="table-header">
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Fecha Ingreso</th>
              <th>Salario</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {empleados.length > 0 ? (
              empleados.map((empleado) => (
                <tr key={empleado.id} className="table-row">
                  <td>{empleado.nombreCompleto}</td>
                  <td>{empleado.documento}</td>
                  <td>{empleado.cargo}</td>
                  <td>{empleado.departamento}</td>
                  <td>{formatearFecha(empleado.fechaIngreso)}</td>
                  <td>{formatearMoneda(empleado.salario)}</td>
                  <td>
                    <span className={`estado-badge ${
                      empleado.estado === 'Activo' 
                        ? 'estado-activo' 
                        : 'estado-inactivo'
                    }`}>
                      {empleado.estado}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-message">
                  No se encontraron empleados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div>
          Mostrando <span className="font-medium">{empleados.length}</span> resultados
        </div>
        <button
          onClick={() => navigate('/reportes/anotaciones')}
          className="anotaciones-button"
        >
          Ver Reporte de Anotaciones
        </button>
      </div>
    </div>
  );
};

export default ReporteEmpleados;