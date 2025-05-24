const empleadoServicio = require('../servicios/empleadoServicio');

const controladorEmpleado = {
  // Obtener todos los empleados
  obtenerTodos: async (req, res, next) => {
    try {
      const empleados = await empleadoServicio.obtenerEmpleados();
      res.json(empleados);
    } catch (error) {
      next(error);
    }
  },

  // Crear nuevo empleado
  crear: async (req, res, next) => {
    try {
      const datosEmpleado = req.body;
      const nuevoEmpleado = await empleadoServicio.crearEmpleado(datosEmpleado);
      res.status(201).json(nuevoEmpleado);
    } catch (error) {
      next(error);
    }
  },

  // Obtener un empleado por ID
  obtenerPorId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const empleado = await empleadoServicio.obtenerEmpleadoPorId(id);
      res.json(empleado);
    } catch (error) {
      next(error);
    }
  },

  // Actualizar empleado
  actualizar: async (req, res, next) => {
    try {
      const { id } = req.params;
      const datosActualizados = req.body;
      const empleado = await empleadoServicio.actualizarEmpleado(id, datosActualizados);
      res.json(empleado);
    } catch (error) {
      next(error);
    }
  },

  // Eliminar empleado
  eliminar: async (req, res, next) => {
    try {
      const { id } = req.params;
      await empleadoServicio.eliminarEmpleado(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = controladorEmpleado;