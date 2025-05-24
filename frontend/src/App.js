import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './componentes/autenticacion/InicioSesion';
import PanelControl from './paginas/PanelControl';
import ListaEmpleados from './componentes/empleados/ListaEmpleados';
import AgregarEmpleado from './componentes/empleados/AgregarEmpleado';
import ReporteEmpleados from './componentes/reportes/ReporteEmpleados';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/panel" element={<PanelControl />} />
        <Route path="/empleados" element={<ListaEmpleados />} />
        <Route path="/empleados/nuevo" element={<AgregarEmpleado />} />
        <Route path="/reportes/empleados" element={<ReporteEmpleados />} />
        {/* Agrega aquí el resto de tus rutas */}
      </Routes>
    </Router>
  );
}

export default App;