import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PanelControl.css';


const PanelControl = () => {
  const navigate = useNavigate();

  return (
    <div className="panel-container" >
      <header className="panel-header">
        <div className="usuario-info">
        
          <div>
            <h1>NOMBRE USUARIO</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit duis senectus urna...</p>
          </div>
        </div>
      </header>

      <section className="panel-acciones">
        <button className="accion-card" onClick={() => navigate('/empleados/nuevo')}>
          <div className="accion-icono">👥</div>
          <span>Agregar Empleado</span>
        </button>
        
        <button className="accion-card" onClick={() => navigate('/empleados')}>
          <div className="accion-icono">🔍</div>
          <span>Consultar Empleado</span>
        </button>
        
        <button className="accion-card" onClick={() => navigate('/editar-empleado/1')}>
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
          <h2><span className="reporte-icono">📊</span> Todos los Empleados</h2>
          <h3>Empleados Activos</h3>
        </div>
        
        <div className="reportes-grid">
          <div className="reporte-card" onClick={() => navigate('/reportes/anotaciones')}>
            <div className="reporte-content">
              <span className="reporte-emoji">📑</span>
              <span>Reporte de Anotaciones</span>
            </div>
            <div className="reporte-badge">15 nuevas</div>
          </div>
          
          <div className="reporte-card" onClick={() => navigate('/reportes/empleados')}>
            <div className="reporte-content">
              <span className="reporte-emoji">👨‍💼</span>
              <span>Reporte completo</span>
            </div>
            <div className="reporte-badge">124 empleados</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PanelControl;