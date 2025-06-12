import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './agregar.css';

const AgregarAnotacion = () => {
  const navigate = useNavigate();
  const [empleadoId, setEmpleadoId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const API_BASE_URL = 'http://localhost:3001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!empleadoId || !titulo || !descripcion) {
      setError('Todos los campos son obligatorios.');
      return;
    } 

    try {
      const response = await fetch(`${API_BASE_URL}/api/anotaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          empleadoId,
          titulo,
          descripcion,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar la anotación.');
      }

      const data = await response.json();
      setSuccess('Anotación agregada exitosamente!');
      console.log('Anotación agregada:', data);

      // Limpiar formulario
      setEmpleadoId('');
      setTitulo('');
      setDescripcion('');

    } catch (err) {
      console.error('Error al enviar la anotación:', err);
      setError(err.message || 'Hubo un problema al conectar con el servidor.');
    }
  };

  return (
    <div className="agregar-anotacion-container">
      <h1>Agregar Nueva Anotación</h1>
      
      <form onSubmit={handleSubmit} className="anotacion-form">
        <div className="form-group">
          <label htmlFor="empleadoId">ID del Empleado:</label>
          <input
            type="text"
            id="empleadoId"
            value={empleadoId}
            onChange={(e) => setEmpleadoId(e.target.value)}
            placeholder="Ej: 12345"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="titulo">Título de la Anotación:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Breve resumen de la anotación"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Detalles completos de la anotación"
            rows="5"
            required
          ></textarea>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Guardar Anotación
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarAnotacion;