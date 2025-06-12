import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerta from '../ui/Alerta';
import Tabs from '../ui/Tabs';

const ConfiguracionSistema = () => {
  const [configuracion, setConfiguracion] = useState({
    empresa: {
      nombre: '',
      nit: '',
      direccion: '',
      telefono: '',
      logo: ''
    },
    notificaciones: {
      emailAdmin: true,
      emailEmpleados: false,
      alertasSistema: true
    },
    seguridad: {
      requerir2FA: false,
      complejidadPassword: 'media',
      tiempoSesion: 30
    }
  });
  const [errores, setErrores] = useState([]);
  const [guardando, setGuardando] = useState(false);
  const [tabActual, setTabActual] = useState('empresa');
  const navigate = useNavigate();

  // Simular carga de configuración
  useEffect(() => {
    const cargarConfiguracion = async () => {
      try {
        // Simulación de datos - en producción sería una llamada a la API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const datosEjemplo = {
          empresa: {
            nombre: 'Mi Empresa SAS',
            nit: '900123456-7',
            direccion: 'Calle 123 #45-67, Bogotá',
            telefono: '+57 601 1234567',
            logo: '/logo-empresa.png'
          },
          notificaciones: {
            emailAdmin: true,
            emailEmpleados: false,
            alertasSistema: true
          },
          seguridad: {
            requerir2FA: false,
            complejidadPassword: 'media',
            tiempoSesion: 30
          }
        };
        
        setConfiguracion(datosEjemplo);
      } catch (error) {
        setErrores(['Error al cargar la configuración del sistema']);
      }
    };

    cargarConfiguracion();
  }, []);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    const [seccion, campo] = name.split('.');

    setConfiguracion(prev => ({
      ...prev,
      [seccion]: {
        ...prev[seccion],
        [campo]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setGuardando(true);
    
    try {
      // Simular guardado en API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setErrores([]);
      // Mostrar mensaje de éxito
      alert('Configuración guardada correctamente');
    } catch (error) {
      setErrores(['Error al guardar la configuración']);
    } finally {
      setGuardando(false);
    }
  };

  const tabs = [
    { id: 'empresa', label: 'Empresa' },
    { id: 'notificaciones', label: 'Notificaciones' },
    { id: 'seguridad', label: 'Seguridad' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Configuración del Sistema</h1>
        <button
          onClick={() => navigate('/panel')}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Volver al Panel
        </button>
      </div>

      {errores.length > 0 && (
        <Alerta tipo="error" mensajes={errores} onCerrar={() => setErrores([])} />
      )}

      <Tabs 
        tabs={tabs} 
        activeTab={tabActual}
        onChange={setTabActual}
        className="mb-6"
      />

      <form onSubmit={manejarEnvio}>
        {tabActual === 'empresa' && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre de la Empresa*
                </label>
                <input
                  type="text"
                  name="empresa.nombre"
                  value={configuracion.empresa.nombre}
                  onChange={manejarCambio}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  NIT*
                </label>
                <input
                  type="text"
                  name="empresa.nit"
                  value={configuracion.empresa.nit}
                  onChange={manejarCambio}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  name="empresa.direccion"
                  value={configuracion.empresa.direccion}
                  onChange={manejarCambio}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="empresa.telefono"
                  value={configuracion.empresa.telefono}
                  onChange={manejarCambio}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Logo de la Empresa
                </label>
                <div className="flex items-center">
                  {configuracion.empresa.logo && (
                    <img 
                      src={configuracion.empresa.logo} 
                      alt="Logo empresa" 
                      className="h-16 w-16 object-contain mr-4 border rounded"
                    />
                  )}
                  <input
                    type="file"
                    onChange={(e) => {
                      // Simular carga de imagen
                      const file = e.target.files[0];
                      if (file) {
                        setConfiguracion(prev => ({
                          ...prev,
                          empresa: {
                            ...prev.empresa,
                            logo: URL.createObjectURL(file)
                          }
                        }));
                      }
                    }}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {tabActual === 'notificaciones' && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="notificaciones.emailAdmin"
                  checked={configuracion.notificaciones.emailAdmin}
                  onChange={manejarCambio}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enviar notificaciones por email a administradores
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="notificaciones.emailEmpleados"
                  checked={configuracion.notificaciones.emailEmpleados}
                  onChange={manejarCambio}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enviar notificaciones por email a empleados
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="notificaciones.alertasSistema"
                  checked={configuracion.notificaciones.alertasSistema}
                  onChange={manejarCambio}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Mostrar alertas del sistema en el panel
                </label>
              </div>
            </div>
          </div>
        )}

        {tabActual === 'seguridad' && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="seguridad.requerir2FA"
                  checked={configuracion.seguridad.requerir2FA}
                  onChange={manejarCambio}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Requerir autenticación de dos factores (2FA) para administradores
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complejidad de contraseñas
                </label>
                <select
                  name="seguridad.complejidadPassword"
                  value={configuracion.seguridad.complejidadPassword}
                  onChange={manejarCambio}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="baja">Baja (6+ caracteres)</option>
                  <option value="media">Media (8+ caracteres, mayúsculas/números)</option>
                  <option value="alta">Alta (10+ caracteres, con símbolos)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo de sesión inactiva (minutos)
                </label>
                <input
                  type="number"
                  name="seguridad.tiempoSesion"
                  value={configuracion.seguridad.tiempoSesion}
                  onChange={manejarCambio}
                  min="1"
                  max="120"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={guardando}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              guardando ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {guardando ? 'Guardando...' : 'Guardar Configuración'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfiguracionSistema;