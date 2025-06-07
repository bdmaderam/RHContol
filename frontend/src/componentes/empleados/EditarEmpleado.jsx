import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditarEmpleado = () => {
    const { cedula: empleadoCedula } = useParams();
    const navigate = useNavigate();

    const [empleado, setEmpleado] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        cargo: '',
        salario: '',
        activo: false // <-- Nuevo campo, estado inicial false
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmpleado = async () => {
            try {
                const response = await axios.get(`/api/empleados/${empleadoCedula}`);
                // Asegúrate de que activo sea un booleano para el checkbox
                setEmpleado({
                    ...response.data,
                    activo: response.data.activo === 1 ? true : false // Convierte 1/0 a true/false
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEmpleado(prevState => ({
            ...prevState,
            // Si es un checkbox, usa 'checked', de lo contrario usa 'value'
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const datosAActualizar = {
                nombre: empleado.nombre,
                apellido: empleado.apellido,
                cargo: empleado.cargo,
                salario: empleado.salario,
                activo: empleado.activo ? 1 : 0 // <-- Convierte true/false a 1/0 para la DB
            };

            const response = await axios.put(`/api/empleados/${empleadoCedula}`, datosAActualizar);
            console.log('Empleado actualizado:', response.data);
            alert('Empleado actualizado exitosamente!');
            navigate('/empleados');
        } catch (err) {
            console.error('Error al actualizar empleado:', err.response ? err.response.data : err.message);
            alert(`Error al actualizar empleado: ${err.response ? err.response.data.message : err.message}`);
        }
    };

    if (loading) {
        return <p>Cargando datos del empleado...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }   

    return (
        <div className="editar-empleado-container">
            <h2>Editar Empleado</h2>
            <form onSubmit={handleSubmit} className="editar-empleado-form">
                <div className="form-group">
                    <label>Cédula:</label>
                    <input
                        type="text"
                        name="cedula"
                        value={empleado.cedula}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={empleado.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        value={empleado.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Cargo:</label>
                    <input
                        type="text"
                        name="cargo"
                        value={empleado.cargo || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Salario:</label>
                    <input
                        type="number"
                        name="salario"
                        value={empleado.salario || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Activo:</label>
                    <input
                     type="checkbox"
                        name="activo"
                        value={empleado.activo}
                         onChange={handleChange}
                    />
                </div>
                <div className="form-actions">

                    <button type="submit" className="submit-btn">
                        Guardar Cambios
                    </button>
                    <button type="button" onClick={() => navigate('/empleados')} className="submit-btn">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarEmpleado;