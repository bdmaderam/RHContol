import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './reporte.css';

const ListaTodasAnotaciones = () => {
    const [anotaciones, setAnotaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodasAnotaciones = async () => {
            try {
                const response = await axios.get('/api/anotaciones/todas');
                setAnotaciones(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error al obtener todas las anotaciones:', err.response ? err.response.data : err.message);
                setError('No se pudo cargar la lista completa de anotaciones.');
                setLoading(false);
            }
        };

        fetchTodasAnotaciones();
    }, []);

    if (loading) {
        return <p className="loading-message">Cargando todas las anotaciones...</p>;
    }

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <button 
                    className="volver-button"
                    onClick={() => navigate('/')}
                >
                    Volver al Inicio
                </button>
            </div>
        );
    }

    return (
        <div className="lista-anotaciones-container">
                      <header className="panel-header">
        <div className="usuario-info">
        
          <div className='titulo'>
            <h1>RHCONTROL</h1><br /><br />

          </div>
        </div>
      </header>
            <h2>Todas las Anotaciones</h2>
            
            {anotaciones.length === 0 ? (
                <p className="empty-message">No hay anotaciones registradas en el sistema.</p>
            ) : (
                <div className="anotaciones-grid">
                    {anotaciones.map(anotacion => (
                        <div key={anotacion.id} className="anotacion-card">
                            <p><strong>Cédula Empleado:</strong> {anotacion.empleado_cedula}</p>
                            <p className="anotacion-fecha">
                                <strong>Fecha:</strong> {new Date(anotacion.fecha_creacion).toLocaleString('es-ES')}
                            </p>
                            <div className="anotacion-contenido">
                                <p>{anotacion.contenido}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <button className="submit-btn" type="button" onClick={() => navigate('/Panel')} > Volver </button> 
        </div>
    );
};

export default ListaTodasAnotaciones;