import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Buscar.css';

const BuscarEmpleadoParaEditar = () => {
    const [cedula, setCedula] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  
    const handleVolver = () => {
        navigate('/Panel'); // Cambia esto por tu ruta deseada
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!cedula.trim()) {
            setError('Por favor, ingresa una cédula para buscar.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`/api/empleados/${cedula.trim()}`);
            navigate(`/empleados/editar/${cedula.trim()}`);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError(`El empleado con cédula "${cedula.trim()}" no fue encontrado.`);
            } else {
                console.error('Error al verificar empleado:', err.response ? err.response.data : err.message);
                setError('Ocurrió un error al buscar el empleado. Por favor, inténtalo de nuevo más tarde.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="buscar-empleado-container">
             <header className="panel-header">
        <div className="usuario-info">
        
          <div className='titulo'>
            <h1>RHCONTROL</h1><br /><br />

          </div>
        </div>
      </header>

            
            <h2>Buscar Empleado para Editar</h2>
            
            <form onSubmit={handleSubmit} className="buscar-empleado-form">
                <div className="form-group">
                    <label htmlFor="cedulaBusqueda">Ingresa la Cédula del Empleado a Editar:</label>
                    <input
                        type="text"
                        id="cedulaBusqueda"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                
                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="search-btn"
                        disabled={loading}
                    >
                        {loading ? 'Buscando...' : 'Buscar y Editar'}
                    </button>
                </div>
                <button className="submit-btn" type="button" onClick={() => navigate('/Panel')} > Volver </button>
            </form>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <div className="error-actions">
                        <button 
                            onClick={() => { setCedula(''); setError(null); }} 
                            className="retry-btn"
                        >
                            Volver a Intentar
                        </button>
                        <button 
                            onClick={() => navigate('/empleados')} 
                            className="list-btn"
                        >
                            Ver Lista de Empleados
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuscarEmpleadoParaEditar;