import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Alerta from '../ui/Alerta';
import Tarjeta from '../ui/Tarjeta';
import ListaAnotaciones from '../anotaciones/ListaAnotaciones';

const VerEmpleado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [empleado, setEmpleado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState([]);
  const [mostrarAnotaciones, setMostrarAnotaciones] = useState(false);

  // Mensaje de éxito al redirigir desde otras páginas
  const [mensajeExito, setMensajeExito] = useState(location.state?.mensaje || '');

  useEffect(() => {
    const cargarEmpleado = async () => {
      try {
        // Simulación de datos - en producción sería una llamada a la API
        const datosEjemplo = {
          id: 1,
          nombres: 'Juan',
          apellidos: 'Pérez',
          tipoDocumento: 'CC',
          numeroDocumento: '123456789',
          fechaNacimiento: '1990-05-15',
          cargo: 'Desarrollador Senior',
          salario: 5000000,
          dependencia: 'Tecnología',
          tieneCuentaBancaria: true,
          esTemporal: false,
          activo: true,
          fechaIngreso: '2020-03-10'
        };
        
        setEmpleado(datosEjemplo);
      } catch (error) {
        setErrores(['Error al cargar los datos del empleado']);
      } finally {
        setCargando(false);
      }
    };

    cargarEmpleado();
  }, [id]);

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
    return <div className="text-center py-8">Cargando información del empleado...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
                <header className="panel-header">
        <div className="usuario-info">
        
          <div className='titulo'>
            <h1>RHCONTROL</h1><br /><br />

          </div>
        </div>
      </header>
      {mensajeExito && (
        <Alerta 
          tipo="exito" 
          mensajes={[mensajeExito]} 
          onCerrar={() => setMensajeExito('')} 
        />
      )}
      
      {errores.length > 0 && (
        <Alerta tipo="error" mensajes={errores} onCerrar={() => setErrores([])} />
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {empleado.nombres} {empleado.apellidos}
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/empleados/editar/${empleado.cedula}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Editar
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Volver
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Información básica */}
        <Tarjeta titulo="Información Personal">
          <div className="space-y-2">
            <p><span className="font-semibold">Documento:</span> {empleado.tipoDocumento} {empleado.numeroDocumento}</p>
            <p><span className="font-semibold">Fecha de Nacimiento:</span> {formatearFecha(empleado.fechaNacimiento)}</p>
            <p><span className="font-semibold">Estado:</span> {empleado.activo ? 'Activo' : 'Inactivo'}</p>
          </div>
        </Tarjeta>

        {/* Información laboral */}
        <Tarjeta titulo="Información Laboral">
          <div className="space-y-2">
            <p><span className="font-semibold">Cargo:</span> {empleado.cargo}</p>
            <p><span className="font-semibold">Salario:</span> {formatearMoneda(empleado.salario)}</p>
            <p><span className="font-semibold">Dependencia:</span> {empleado.dependencia}</p>
            <p><span className="font-semibold">Fecha de Ingreso:</span> {formatearFecha(empleado.fechaIngreso)}</p>
          </div>
        </Tarjeta>

        {/* Información adicional */}
        <Tarjeta titulo="Información Adicional">
          <div className="space-y-2">
            <p><span className="font-semibold">Cuenta bancaria:</span> {empleado.tieneCuentaBancaria ? 'Sí' : 'No'}</p>
            <p><span className="font-semibold">Tipo de contrato:</span> {empleado.esTemporal ? 'Temporal' : 'Indefinido'}</p>
          </div>
        </Tarjeta>
      </div>

      {/* Sección de anotaciones */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Anotaciones</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setMostrarAnotaciones(!mostrarAnotaciones)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              {mostrarAnotaciones ? 'Ocultar' : 'Mostrar'} Anotaciones
            </button>
            <button
              onClick={() => navigate(`/empleados/${id}/anotaciones/nueva`)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Agregar Anotación
            </button>
          </div>
        </div>

        {mostrarAnotaciones && (
          <ListaAnotaciones empleadoId={id} />
        )}
      </div>
    </div>
  );
};

export default VerEmpleado;