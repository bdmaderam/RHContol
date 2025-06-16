import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PanelControl.css';


const PanelControl = () => {
  const navigate = useNavigate();

  return (
    <div className="panel-container" >
      <header className="panel-header">
        <div className="usuario-info">
        
          <div className='titulo'>
            <h1>RHCONTROL</h1>
            <p>BIENVENIDO DE NUEVO
            </p>
          </div>
        </div>
      </header>
      <h2><span className="reporte-icono"></span>💻 ACCIONES</h2>
<p>¿Que quieres hacer hoy?</p><br /><br />
      <section className="panel-acciones">
        <button className="accion-card" onClick={() => navigate('/empleados/nuevo')}>
          <div className="accion-icono">👥</div>
          <span>Agregar Empleado</span>
        </button>
        
        <button className="accion-card" onClick={() => navigate('/empleado-consulta')}>
          <div className="accion-icono">🔍</div>
          <span>Consultar Empleado</span>
        </button>
        
        <button className="accion-card" onClick={() => navigate('/empleados/buscar-editar')}>
          <div className="accion-icono">✏️</div>
          <span>Editar Empleado</span>
        </button>
        
        <button className="accion-card" onClick={() => navigate('/agregar-anotacion')}>
          <div className="accion-icono">📝</div>
          <span>Agregar Anotación</span>
        </button>
      </section>

      <section className="panel-reportes">
        <div className="reportes-header">
          <h2><span className="reporte-icono">📊</span> REPORTES</h2>
          <h3>Genera y revisa los reportes</h3> 
        </div>
        
        <div className="reportes-grid">
          <div className="reporte-card" onClick={() => navigate('/reportes/anotaciones')}>
            <div className="reporte-content">
              <span className="reporte-emoji">📑</span>
              <span>Reporte de Anotaciones</span>
            </div>

          </div>
          
          <div className="reporte-card" onClick={() => navigate('/empleados')}>
            <div className="reporte-content">
              <span className="reporte-emoji">👨‍💼</span>
              <span>Reporte completo</span>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PanelControl;