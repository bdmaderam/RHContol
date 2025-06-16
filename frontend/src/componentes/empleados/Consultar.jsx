import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ConsultarEmpleado = () => {
    const { cedula: empleadoCedula } = useParams();
    const navigate = useNavigate();
    
    const [cedula, setCedula] = useState('');
    const [empleado, setEmpleado] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        cargo: '',
        salario: '',
        activo: false
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmpleado = async () => {
            try {
                const response = await axios.get(`/api/empleados/${empleadoCedula}`);
                setEmpleado({
                    ...response.data,
                    activo: response.data.activo === 1 ? true : false
                });
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar datos del empleado:', err.response ? err.response.data : err.message);
                setError('No se pudo cargar el empleado. Asegúrate que la cédula sea correcta.');
                setLoading(false);
            }
        };

        fetchEmpleado();
    }, [empleadoCedula]);

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
            navigate(`/empleados/Consulta/${cedula.trim()}`);
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

    // Función para manejar la redirección a editar
    const handleEditar = () => {
        navigate(`/empleados/editar/${empleado.cedula}`);
    };

    return (
        <div className="Consultar-empleado-container">
                      <header className="panel-header">
        <div className="usuario-info">
        
          <div className='titulo'>
            <h1>RHCONTROL</h1><br /><br />

          </div>
        </div>
      </header>
            <h2>Consultar Empleado</h2>
            <form onSubmit={handleSubmit} className="Consultar-empleado-form">
                <div className="form-group">
                    <label>Cédula:</label>
                    <input
                        type="text"
                        name="cedula"
                        value={empleado.cedula}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={empleado.nombre}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        value={empleado.apellido}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Cargo:</label>
                    <input
                        type="text"
                        name="cargo"
                        value={empleado.cargo || ''}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Salario:</label>
                    <input
                        type="number"
                        name="salario"
                        value={empleado.salario || ''}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Activo:</label>
                    <input
                        type="checkbox"
                        name="activo"
                        checked={empleado.activo}
                        disabled
                    />
                </div>
                <div className="form-actions">
                    <button 
                        type="button" 
                        onClick={handleEditar} 
                        className="submit-btn"
                    >
                        Editar Empleado
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/panel')} 
                        className="submit-btn"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConsultarEmpleado;