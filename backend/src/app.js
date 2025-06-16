// backend/src/app.js
const express = require('express');
const cors = require('cors');
require('./configuracion/baseDeDatos'); // Para asegurar que la base de datos se inicializa

const empleadoRoutes = require('./rutas/empleadoRutas');
const anotacionRoutes = require('./rutas/anotacionRutas'); // <-- Importa las nuevas rutas

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el body de las peticiones en JSON

// Rutas
app.use('/api', empleadoRoutes); // Prefijo /api para rutas de empleados
app.use('/api', anotacionRoutes); // <-- Prefijo /api para rutas de anotaciones

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor!');
});

app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});