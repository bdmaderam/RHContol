// backend/src/controllers/anotacionController.js
const db = require('../configuracion/baseDeDatos'); // Asumo que este path es correcto para tu DB

// Controlador para agregar una nueva anotación
exports.addAnotacion = (req, res) => {
    const { empleado_cedula, contenido } = req.body;

    if (!empleado_cedula || !contenido) {
        return res.status(400).json({ message: 'Cédula del empleado y contenido son obligatorios.' });
    }

    db.get('SELECT cedula FROM empleados WHERE cedula = ?', [empleado_cedula], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar empleado.', error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'El empleado especificado no existe.' });
        }

        const stmt = db.prepare('INSERT INTO anotaciones (empleado_cedula, contenido) VALUES (?, ?)');
        stmt.run(empleado_cedula, contenido, function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error al agregar anotación.', error: err.message });
            }
            res.status(201).json({ message: 'Anotación agregada exitosamente', id: this.lastID });
        });
        stmt.finalize();
    });
};

// --- ¡NUEVA FUNCIÓN! Controlador para obtener TODAS las anotaciones ---
exports.getAllAnotaciones = (req, res) => {
    db.all(`SELECT
                a.id,
                a.empleado_cedula,
                a.contenido,
                a.fecha_creacion,
                e.nombre AS empleado_nombre,
                e.apellido AS empleado_apellido
            FROM anotaciones a
            JOIN empleados e ON a.empleado_cedula = e.cedula
            ORDER BY a.fecha_creacion DESC`, [], (err, rows) => {
        if (err) {
            console.error('Error en getAllAnotaciones:', err.message);
            return res.status(500).json({ message: 'Error al obtener todas las anotaciones.', error: err.message });
        }
        res.status(200).json(rows);
    });
};
// --- FIN NUEVA FUNCIÓN ---

// Controlador para obtener todas las anotaciones de un empleado específico
exports.getAnotacionesByEmpleadoCedula = (req, res) => {
    const { empleado_cedula } = req.params;

    db.all('SELECT * FROM anotaciones WHERE empleado_cedula = ? ORDER BY fecha_creacion DESC', [empleado_cedula], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener anotaciones.', error: err.message });
        }
        res.status(200).json(rows);
    });
};

// Controlador para eliminar una anotación
exports.deleteAnotacion = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM anotaciones WHERE id = ?', id, function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar anotación.', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Anotación no encontrada.' });
        }
        res.status(200).json({ message: 'Anotación eliminada exitosamente.' });
    });
};