import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerta from '../ui/Alerta';

const RestablecerContrasena = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    email: ''
  });
  const [errores, setErrores] = useState([]);
  const [enviado, setEnviado] = useState(false);
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    // Validación
    const nuevosErrores = [];
    if (!formData.usuario.trim()) nuevosErrores.push('El usuario es requerido');
    if (!formData.email.trim()) nuevosErrores.push('El correo electrónico es requerido');
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) nuevosErrores.push('El correo electrónico no es válido');
    
    if (nuevosErrores.length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    try {
      // Simular envío a la API
      // await authServicio.restablecerContrasena(formData);
      
      // Simulación de éxito
      setEnviado(true);
      setErrores([]);
    } catch (error) {
      setErrores(['Error al enviar la solicitud. Intente nuevamente.']);
    }
  };

  if (enviado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Solicitud Recibida
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <p className="text-sm text-gray-600">
              Si el usuario y correo electrónico coinciden con nuestros registros, 
              recibirás un enlace para restablecer tu contraseña.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Restablecer Contraseña
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ingresa tu usuario y correo electrónico registrado
          </p>
        </div>

        {errores.length > 0 && (
          <Alerta tipo="error" mensajes={errores} onCerrar={() => setErrores([])} />
        )}

        <form className="mt-8 space-y-6" onSubmit={manejarEnvio}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="usuario" className="sr-only">Usuario</label>
              <input
                id="usuario"
                name="usuario"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Usuario"
                value={formData.usuario}
                onChange={manejarCambio}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={manejarCambio}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enviar Solicitud
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="font-medium text-blue-600 hover:text-blue-500 text-sm"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestablecerContrasena;