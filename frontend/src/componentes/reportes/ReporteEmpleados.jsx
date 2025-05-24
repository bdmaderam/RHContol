import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerta from '../ui/Alerta';
import FiltroReportes from './FiltroReportes';
import { generarPDF, generarExcel } from '../../utilidades/generadorReportes';

const ReporteEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState([]);
  const [filtros, setFiltros] = useState({
    estado: 'activos',
    departamento: '',
    fechaDesde: '',
    fechaHasta: ''
  });
  const navigate = useNavigate();

  // Simular carga de datos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Simulación de datos - en producción sería una llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const datosEjemplo = [
          {
            id: 1,
            nombreCompleto: 'Juan Pérez',
            documento: '123456789',
            cargo: 'Desarrollador',
            departamento: 'TI',
            fechaIngreso: '2020-05-15',
            salario: 5000000,
            estado: 'Activo'
          },
          {
            id: 2,
            nombreCompleto: 'María Gómez',
            documento: '987654321',
            cargo: 'Diseñadora',
            departamento: 'Marketing',
            fechaIngreso: '2019-11-20',
            salario: 4500000,
            estado: 'Activo'
          },
          {
            id: 3,
            nombreCompleto: 'Carlos Rodríguez',
            documento: '456789123',
            cargo: 'Gerente',
            departamento: 'Administración',
            fechaIngreso: '2018-03-10',
            salario: 8000000,
            estado: 'Inactivo'
          }
        ];

        // Aplicar filtros simulados
        let datosFiltrados = datosEjemplo;
        if (filtros.estado === 'activos') {
          datosFiltrados = datosFiltrados.filter(e => e.estado === 'Activo');
        } else if (filtros.estado === 'inactivos') {
          datosFiltrados = datosFiltrados.filter(e => e.estado === 'Inactivo');
        }

        if (filtros.departamento) {
          datosFiltrados = datosFiltrados.filter(e => 
            e.departamento.toLowerCase().includes(filtros.departamento.toLowerCase())
          );
        }

        setEmpleados(datosFiltrados);
      } catch (error) {
        setErrores(['Error al cargar los datos de empleados']);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [filtros]);

  const manejarGenerarReporte = (formato) => {
    switch(formato) {
      case 'pdf':
        generarPDF(empleados, 'reporte_empleados');
        break;
      case 'excel':
        generarExcel(empleados, 'reporte_empleados');
        break;
      default:
        break;
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(valor);
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Reporte de Empleados</h1>
      
      {errores.length > 0 && (
        <Alerta tipo="error" mensajes={errores} onCerrar={() => setErrores([])} />
      )}

      <div className="mb-6">
        <FiltroReportes 
          filtros={filtros}
          onChange={setFiltros}
          onGenerarReporte={manejarGenerarReporte}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cargo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Ingreso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {empleados.length > 0 ? (
              empleados.map((empleado) => (
                <tr key={empleado.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {empleado.nombreCompleto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {empleado.documento}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {empleado.cargo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {empleado.departamento}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatearFecha(empleado.fechaIngreso)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatearMoneda(empleado.salario)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      empleado.estado === 'Activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {empleado.estado}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No se encontraron empleados con los filtros seleccionados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Mostrando <span className="font-medium">{empleados.length}</span> resultados
        </div>
        <button
          onClick={() => navigate('/reportes/anotaciones')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Ver Reporte de Anotaciones
        </button>
      </div>
    </div>
  );
};

export default ReporteEmpleados;