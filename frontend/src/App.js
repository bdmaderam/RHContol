import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './componentes/autenticacion/InicioSesion';
import PanelControl from './paginas/PanelControl';
import ListaEmpleados from './componentes/empleados/ListaEmpleados';
import ConsultaEmpleado from './componentes/empleados/ConsultaEmpelado';
import ConsultarEmpleado from './componentes/empleados/Consultar';
import EditarEmpleados from './componentes/empleados/EditarEmpleado';
import AgregarEmpleado from './componentes/empleados/AgregarEmpleado';
import AgregarAnotacion from './componentes/anotaciones/AgregarAnotacion';
import ReporteEmpleados from './componentes/reportes/ReporteEmpleados';
import ReporteAnotaciones from './componentes/reportes/ReporteAnotaciones';
import BuscarEmpleadoParaEditar from './componentes/empleados/BuscarEmpleadoParaEditar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/panel" element={<PanelControl />} />
        <Route path="/empleados" element={<ListaEmpleados />} />
        <Route path="/empleado-consulta" element={<ConsultaEmpleado />} />
        <Route path="/empleados/editar/:cedula" element={<EditarEmpleados />} />
        <Route path="/empleados/Consulta/:cedula" element={<ConsultarEmpleado />} />
        <Route path="/empleados/buscar-editar" element={<BuscarEmpleadoParaEditar />} />
        <Route path="/empleados/nuevo" element={<AgregarEmpleado />} />
        <Route path="/agregar-anotacion" element={<AgregarAnotacion />} />
        <Route path="/reportes/empleados" element={<ReporteEmpleados />} />
        <Route path="/reportes/anotaciones" element={<ReporteAnotaciones />} />
        {/* Agrega aquí el resto de tus rutas */}
      </Routes>
    </Router>
  );
}

export default App;