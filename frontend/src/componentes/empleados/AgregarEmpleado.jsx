import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AgregarEmpleado.css';


const AgregarEmpleado = () => {
  const [empleado, setEmpleado] = useState({
    nombres: '',
    apellidos: '',
    tipoDocumento: 'CC',
    numeroDocumento: '',
    fechaNacimiento: '',
    cargo: '',
    salario: '',
    dependencia: '',
    tieneCuenta: false,
    esTemporal: false
  });

  const [errores, setErrores] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmpleado({
      ...empleado,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validarCampos();
    if (nuevosErrores.length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    // Lógica para guardar el empleado
    navigate('/empleados', { state: { mensaje: 'Empleado agregado exitosamente' } });
  };

  const validarCampos = () => {
    const errores = [];
    if (!empleado.nombres.trim()) errores.push('Nombres son requeridos');
    if (!empleado.apellidos.trim()) errores.push('Apellidos son requeridos');
    if (!empleado.numeroDocumento.trim()) errores.push('Número de documento es requerido');
    if (!empleado.cargo.trim()) errores.push('Cargo es requerido');
    return errores;
  };

  return (
    <div className="formulario-container">
      <div className="formulario-header">
        <button onClick={() => navigate(-1)} className="btn-regresar">
         
        </button>
        <h1>
    
          Agregar Nuevo Empleado
        </h1>
      </div>

      {errores.length > 0 && (
        <div className="errores-container">
          {errores.map((error, index) => (
            <p key={index} className="error-message">⚠️ {error}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="empleado-form">
        <div className="form-columns">
          <div className="form-column">
            <div className="form-group">
              <label>Nombres y Apellidos*</label>
              <div className="input-group">
                <input
                  type="text"
                  name="nombres"
                  value={empleado.nombres}
                  onChange={handleChange}
                  placeholder="Nombres"
                  required
                />
                <input
                  type="text"
                  name="apellidos"
                  value={empleado.apellidos}
                  onChange={handleChange}
                  placeholder="Apellidos"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={empleado.fechaNacimiento}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Número de Documento*</label>
              <div className="doc-group">
                <select
                  name="tipoDocumento"
                  value={empleado.tipoDocumento}
                  onChange={handleChange}
                >
                  <option value="CC">C.C.</option>
                  <option value="CE">C.E.</option>
                  <option value="PA">Pasaporte</option>
                </select>
                <input
                  type="text"
                  name="numeroDocumento"
                  value={empleado.numeroDocumento}
                  onChange={handleChange}
                  placeholder="Número"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label>Cargo*</label>
              <input
                type="text"
                name="cargo"
                value={empleado.cargo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Sueldo</label>
              <input
                type="number"
                name="salario"
                value={empleado.salario}
                onChange={handleChange}
                placeholder="$"
              />
            </div>

            <div className="form-group">
              <label>Dependencia</label>
              <input
                type="text"
                name="dependencia"
                value={empleado.dependencia}
                onChange={handleChange}
              />
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="tieneCuenta"
                  checked={empleado.tieneCuenta}
                  onChange={handleChange}
                />
                <span>Tiene cuenta bancaria</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="esTemporal"
                  checked={empleado.esTemporal}
                  onChange={handleChange}
                />
                <span>Ingreso por Temporal</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="btn-guardar">
            Guardar Empleado
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarEmpleado;