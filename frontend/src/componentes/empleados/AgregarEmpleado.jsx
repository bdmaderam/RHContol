import React, { useState } from 'react';
import axios from 'axios'; // Importa axios
import './AgregarEmpleado.css';
import { useNavigate } from 'react-router-dom';

const AgregarEmpleado = () => {
    const navigate = useNavigate();
    const [empleado, setEmpleado] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        cargo: '',
        salario: '',
        activo: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpleado(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/empleados', empleado); // Asegúrate que el puerto coincida con tu backend
            console.log('Empleado agregado:', response.data);
            alert('Empleado agregado exitosamente!');
            // Opcional: limpiar el formulario después de un envío exitoso
            setEmpleado({
                nombre: '',
                apellido: '',
                cedula: '',
                cargo: '',
                salario: '',
                activo: true
            });
        } catch (error) {
            console.error('Error al agregar empleado:', error.response ? error.response.data : error.message);
            alert(`Error al agregar empleado: ${error.response ? error.response.data.message : error.message}`);
        }
    };

return (
  <div className="agregar-empleado-container">
    <h2>Agregar Nuevo Empleado</h2>
    <form onSubmit={handleSubmit} className="agregar-empleado-form">
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
      <div className="form-group form-group-full">
        <label>Cédula:</label>
        <input
          type="text"
          name="cedula"
          value={empleado.cedula}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Cargo:</label>
        <input
          type="text"
          name="cargo"
          value={empleado.cargo}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Salario:</label>
        <input
          type="number"
          name="salario"
          value={empleado.salario}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Activo:</label>
        <input
          type="checkbox"
          name="salario"
          value={empleado.activo}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit" className="submit-btn">Agregar Empleado</button>
      <button className="submit-btn" type="button" onClick={() => navigate('/Panel')} > Volver </button>
    </form>
       
  </div>
);
};

export default AgregarEmpleado;