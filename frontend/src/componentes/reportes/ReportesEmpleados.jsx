import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ReportesEmpleados = () => {
    const [empleadosActivos, setEmpleadosActivos] = useState([]);
    const [empleadosInactivos, setEmpleadosInactivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReportes = async () => {
            try {
                // Obtenemos todos los empleados del backend
                const response = await axios.get('/api/empleados');
                const todosEmpleados = response.data;

                // Filtramos los empleados por su estado 'activo'
                const activos = todosEmpleados.filter(emp => emp.activo === 1);
                const inactivos = todosEmpleados.filter(emp => emp.activo === 0);

                setEmpleadosActivos(activos);
                setEmpleadosInactivos(inactivos);
                setLoading(false);
            } catch (err) {
                console.error('Error al generar reportes:', err.response ? err.response.data : err.message);
                setError('No se pudieron cargar los datos para los reportes.');
                setLoading(false);
            }
        };

        fetchReportes();
    }, []); // Se ejecuta una vez al montar el componente

    if (loading) {
        return <p>Generando reportes...</p>;
    }

    if (error) {
        return (
            <div style={{ color: 'red', marginTop: '20px' }}>
                <p>{error}</p>
                <button onClick={() => navigate('/')}>Volver al Inicio</button>
            </div>
        );
    }

    return (
        <div className="reportes-container">
            <h1>Reportes de Empleados</h1>

            {/* --- Reporte de Empleados Activos --- */}
            <div className="reporte-seccion">
                <h2>Empleados Activos ({empleadosActivos.length})</h2>
                {empleadosActivos.length === 0 ? (
                    <p>No hay empleados activos registrados.</p>
                ) : (
                    <table className="reporte-tabla">
                        <thead>
                            <tr>
                                <th>Cédula</th>
                                <th>Nombre Completo</th>
                                <th>Cargo</th>
                                <th>Salario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleadosActivos.map(empleado => (
                                <tr key={empleado.cedula}>
                                    <td>{empleado.cedula}</td>
                                    <td>{empleado.nombre} {empleado.apellido}</td>
                                    <td>{empleado.cargo || 'N/A'}</td>
                                    <td>{empleado.salario ? `$${empleado.salario.toFixed(2)}` : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <hr /> {/* Separador visual */}

            {/* --- Reporte de Empleados Inactivos --- */}
            <div className="reporte-seccion">
                <h2>Empleados Inactivos ({empleadosInactivos.length})</h2>
                {empleadosInactivos.length === 0 ? (
                    <p>No hay empleados inactivos registrados.</p>
                ) : (
                    <table className="reporte-tabla">
                        <thead>
                            <tr>
                                <th>Cédula</th>
                                <th>Nombre Completo</th>
                                <th>Cargo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleadosInactivos.map(empleado => (
                                <tr key={empleado.cedula}>
                                    <td>{empleado.cedula}</td>
                                    <td>{empleado.nombre} {empleado.apellido}</td>
                                    <td>{empleado.cargo || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <button
                type="button"
                className="volver-button"
                onClick={() => navigate('/')}
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                Volver al Inicio
            </button>
        </div>
    );
};

export default ReportesEmpleados;