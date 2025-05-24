import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerta from '../ui/Alerta';
import FiltroEmpleados from './FiltroEmpleados';

const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState([]);
  const [filtros, setFiltros] = useState({
    documento: '',
    nombre: '',
    activos: true
  });
  const navigate = useNavigate();

  // Simulación de carga de datos
  useEffect(() => {
    const cargarEmpleados = async () => {
      try {
        // Aquí iría la llamada real a la API
        // const respuesta = await empleadoServicio.obtenerEmpleados(filtros);
        
        // Datos de ejemplo
        const datosEjemplo = [
          {
            id: 1,
            nombres: 'Juan',
            apellidos: 'Pérez',
            tipoDocumento: 'CC',
            numeroDocumento: '123456789',
            cargo: 'Desarrollador',
            activo: true
          },
          {
            id: 2,
            nombres: 'María',
            apellidos: 'Gómez',
            tipoDocumento: 'CC',
            numeroDocumento: '987654321',
            cargo: 'Diseñadora',
            activo: true
          }
        ];
        
        setEmpleados(datosEjemplo);
      } catch (error) {
        setErrores(['Error al cargar los empleados']);
      } finally {
        setCargando(false);
      }
    };

    cargarEmpleados();
  }, [filtros]);

  const manejarFiltroChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  const verDetalle = (id) => {
    navigate(`/empleados/${id}`);
  };

  const editarEmpleado = (id) => {
    navigate(`/empleados/editar/${id}`);
  };

  const agregarAnotacion = (id) => {
    navigate(`/empleados/${id}/anotaciones/nueva`);
  };

  if (cargando) {
    return <div className="text-center py-8">Cargando empleados...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Listado de Empleados</h1>
      
      {errores.length > 0 && (
        <Alerta tipo="error" mensajes={errores} onCerrar={() => setErrores([])} />
      )}

      <div className="mb-6">
        <FiltroEmpleados filtros={filtros} onChange={manejarFiltroChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {empleados.length > 0 ? (
          empleados.map((empleado) => (
           
              <div className="p-4">
                <h3 className="font-bold text-lg">
                  {empleado.nombres} {empleado.apellidos}
                </h3>
                <p className="text-gray-600">
                  {empleado.tipoDocumento}: {empleado.numeroDocumento}
                </p>
                <p className="text-gray-800">{empleado.cargo}</p>
                
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => verDetalle(empleado.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => editarEmpleado(empleado.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => agregarAnotacion(empleado.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Anotación
                  </button>
                </div>
              </div>
           
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            No se encontraron empleados
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaEmpleados;