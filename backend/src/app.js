const express = require('express');
const cors = require('cors');
const empleadoRoutes = require('./rutas/empleadoRutas');

const app = express();
const PORT = process.env.PORT || 5000; // Puedes usar el puerto que quieras, 5000 es común para backends.

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Usar las rutas de empleados
app.use('/api', empleadoRoutes); // Todas las rutas de empleados empezarán con /api

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Backend de RHControl funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});