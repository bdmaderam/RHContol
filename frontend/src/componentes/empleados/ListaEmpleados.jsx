import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './listaEmpleados.css';
import { useNavigate } from 'react-router-dom';

const ListaEmpleados = () => {
    const navigate = useNavigate();
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await axios.get('/api/empleados');
                setEmpleados(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error al obtener la lista de empleados:', err.response ? err.response.data : err.message);
                setError('No se pudo cargar la lista de empleados. Inténtalo de nuevo más tarde.');
                setLoading(false);
            }
        };

        fetchEmpleados();
    }, []);

    if (loading) {
        return <p className="loading-message">Cargando empleados...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="lista-empleados-container">
                      <header className="panel-header">
        <div className="usuario-info">
        
          <div className='titulo'>
            <h1>RHCONTROL</h1><br /><br />

          </div>
        </div>
      </header>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Lista de Empleados</h2>
                <Link to="/empleados/nuevo" className="add-employee-btn">
                    Agregar Empleado
                </Link>
            </div>
            
            {empleados.length === 0 ? (
                <p className="empty-message">No hay empleados registrados todavía.</p>
            ) : (
                <table className="empleados-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Cédula</th>
                            <th>Cargo</th>
                            <th>Salario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map(empleado => (
                            <tr key={empleado.cedula}>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.apellido}</td>
                                <td>{empleado.cedula}</td>
                                <td>{empleado.cargo || 'N/A'}</td>
                                <td>{empleado.salario && !isNaN(empleado.salario) ? `$${Number(empleado.salario).toFixed(2)}` : 'N/A'}</td>
                                <td>
                                    <Link to={`/empleados/editar/${empleado.cedula}`}>
                                        <button className="action-btn">Editar</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
             <button className="submit-btn" type="button" onClick={() => navigate('/Panel')} > Volver </button> 
        </div>
        
    );
};

export default ListaEmpleados;