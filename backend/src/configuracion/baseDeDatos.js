const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.resolve(__dirname, 'empleados.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS empleados (
            cedula TEXT PRIMARY KEY NOT NULL,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL,
            cargo TEXT,
            salario REAL,
            activo INTEGER DEFAULT 1 -- Nuevo campo: 1 para activo, 0 para inactivo
        )`, (err) => {
            if (err) {
                console.error('Error al crear la tabla empleados:', err.message);
            } else {
                console.log('Tabla empleados creada o ya existe con campo activo.');
            }
        });
    }
});

module.exports = db;