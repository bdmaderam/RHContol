import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Archivo CSS separado

const InicioSesion = () => {
  const [credenciales, setCredenciales] = useState({
    usuario: '',
    contraseña: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credenciales.usuario || !credenciales.contraseña) {
      setError('Complete todos los campos');
      return;
    }
    navigate('/panel');
  };

  return (
    <div className="login-container">
      <h1>Bienvenido</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Usuario</label>
          <input
            type="text"
            name="usuario"
            value={credenciales.usuario}
            onChange={(e) => setCredenciales({...credenciales, usuario: e.target.value})}
            placeholder="tu usuario"
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            value={credenciales.contraseña}
            onChange={(e) => setCredenciales({...credenciales, contraseña: e.target.value})}
            placeholder="tu contraseña"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>

      <button 
        onClick={() => navigate('/restablecer-contrasena')} 
        className="forgot-password"
      >
        ¿Olvidaste la contraseña?
      </button>
    </div>
  );
};

export default InicioSesion;