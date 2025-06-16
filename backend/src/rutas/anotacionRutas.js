// backend/src/routes/anotacionRoutes.js
const express = require('express');
const router = express.Router();
// Si esto funciona en tu sistema, úsalo, pero considera renombrar a 'controllers/anotacionController'
const anotacionController = require('../controladores/anotacionControlador');

router.post('/anotaciones', anotacionController.addAnotacion);
// ¡NUEVA RUTA Y ORDEN CORRECTO!
router.get('/anotaciones/todas', anotacionController.getAllAnotaciones);
router.get('/anotaciones/:empleado_cedula', anotacionController.getAnotacionesByEmpleadoCedula);
router.delete('/anotaciones/:id', anotacionController.deleteAnotacion);

module.exports = router;