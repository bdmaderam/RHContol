import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Usaremos axios en lugar de fetch para consistencia y manejo de errores
import './agregar.css'; // Asegúrate que este archivo CSS existe

const AgregarAnotacion = () => {
  const navigate = useNavigate();
  const [empleadoCedula, setEmpleadoCedula] = useState(''); // Cambiado de empleadoId
  const [contenido, setContenido] = useState(''); // Cambiado de titulo y descripcion
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // const API_BASE_URL = 'http://localhost:5000'; // No necesario si usas el proxy en package.json

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!empleadoCedula || !contenido) { // Validar ambos campos
      setError('Cédula del empleado y contenido de la anotación son obligatorios.');
      return;
    }

    try {
      const response = await axios.post('/api/anotaciones', { // Usar axios y la ruta /api
        empleado_cedula: empleadoCedula, // Usar empleado_cedula como en el backend
        contenido: contenido, // Usar 'contenido'
      });

      setSuccess('Anotación agregada exitosamente!');
      console.log('Anotación agregada:', response.data);

      // Limpiar formulario
      setEmpleadoCedula('');
      setContenido('');

    } catch (err) {
      console.error('Error al enviar la anotación:', err);
      // Mejor manejo de errores de axios
      setError(err.response ? err.response.data.message : 'Hubo un problema al conectar con el servidor.');
    }
  };

  return (
    <div className="agregar-anotacion-container">
                <header className="panel-header">
        <div className="usuario-info">
        
          <div className='titulo'>
            <h1>RHCONTROL</h1><br /><br />

          </div>
        </div>
      </header>
      <h1>Agregar Nueva Anotación</h1>

      <form onSubmit={handleSubmit} className="anotacion-form">
        <div className="form-group">
          <label htmlFor="empleadoCedula">Cédula del Empleado:</label>
          <input
            type="text"
            id="empleadoCedula"
            value={empleadoCedula}
            onChange={(e) => setEmpleadoCedula(e.target.value)}
            placeholder="Cédula del empleado"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido de la Anotación:</label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Detalles completos de la anotación"
            rows="5"
            required
          ></textarea>
        </div>

        {error && <div className="error-message" style={{color: 'red', marginTop: '10px'}}>{error}</div>}
        {success && <div className="success-message" style={{color: 'green', marginTop: '10px'}}>{success}</div>}

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Guardar Anotación
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(-1)} // Vuelve a la página anterior
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarAnotacion;