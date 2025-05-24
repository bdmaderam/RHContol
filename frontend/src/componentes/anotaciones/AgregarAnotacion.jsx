import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Alerta from '../ui/Alerta';

const AgregarAnotacion = () => {
  const { empleadoId } = useParams();
  const navigate = useNavigate();
  const [errores, setErrores] = useState([]);
  const [empleado, setEmpleado] = useState(null);
  const [anotacion, setAnotacion] = useState({
    tipo: 'Llamado de atención',
    descripcion: '',
    fecha: new Date().toISOString().split('T')[0] // Fecha actual
  });

  // Cargar datos básicos del empleado
  useEffect(() => {
    const cargarEmpleado = async () => {
      try {
        // Simulación de datos - en producción sería una llamada a la API
        const datosEjemplo = {
          id: empleadoId,
          nombres: 'Juan',
          apellidos: 'Pérez',
          numeroDocumento: '123456789'
        };
        setEmpleado(datosEjemplo);
      } catch (error) {
        setErrores(['Error al cargar datos del empleado']);
      }
    };

    cargarEmpleado();
  }, [empleadoId]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setAnotacion({
      ...anotacion,
      [name]: value
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    // Validación
    const nuevosErrores = [];
    if (!anotacion.descripcion.trim()) {
      nuevosErrores.push('La descripción es requerida');
    }
    
    if (nuevosErrores.length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    try {
      // Aquí iría la llamada a la API para guardar
      // await anotacionServicio.crearAnotacion(empleadoId, anotacion);
      
      // Simulación de éxito
      navigate(`/empleados/${empleadoId}`, { 
        state: { mensaje: 'Anotación agregada correctamente' } 
      });
    } catch (error) {
      setErrores(['Error al guardar la anotación']);
    }
  };

  if (!empleado) {
    return <div className="text-center py-8">Cargando datos del empleado...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Agregar Anotación a {empleado.nombres} {empleado.apellidos}
      </h1>
      <p className="mb-4">Documento: {empleado.numeroDocumento}</p>

      {errores.length > 0 && (
        <Alerta tipo="error" mensajes={errores} onCerrar={() => setErrores([])} />
      )}

      <form onSubmit={manejarEnvio} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tipo de Anotación*
          </label>
          <select
            name="tipo"
            value={anotacion.tipo}
            onChange={manejarCambio}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Llamado de atención">Llamado de atención</option>
            <option value="Suspensión">Suspensión</option>
            <option value="Reconocimiento">Reconocimiento</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fecha*
          </label>
          <input
            type="date"
            name="fecha"
            value={anotacion.fecha}
            onChange={manejarCambio}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Descripción*
          </label>
          <textarea
            name="descripcion"
            value={anotacion.descripcion}
            onChange={manejarCambio}
            rows="5"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Detalles de la anotación..."
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(`/empleados/${empleadoId}`)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Anotación
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarAnotacion;