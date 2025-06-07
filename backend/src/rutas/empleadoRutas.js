const express = require('express');
const router = express.Router();
const empleadoController = require('../controladores/empleadoControlador');

router.post('/empleados', empleadoController.addEmpleado);
router.get('/empleados', empleadoController.getAllEmpleados);
// Cambiamos :id por :cedula en la ruta
router.get('/empleados/:cedula', empleadoController.getEmpleadoByCedula);
// Cambiamos :id por :cedula en la ruta PUT
router.put('/empleados/:cedula', empleadoController.updateEmpleado);

module.exports = router;