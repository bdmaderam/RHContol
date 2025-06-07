const db = require('../configuracion/baseDeDatos');

// Controlador para agregar un nuevo empleado
exports.addEmpleado = (req, res) => {
    const { nombre, apellido, cedula, cargo, salario, activo } = req.body; // <-- Incluye 'activo'

    if (!nombre || !apellido || !cedula) {
        return res.status(400).json({ message: 'Nombre, Apellido y Cédula son campos obligatorios.' });
    }

    // Asegura que activo sea 0 o 1, o usa el valor por defecto si no se provee
    const estadoActivo = (activo === undefined || activo === null) ? 1 : (activo ? 1 : 0);

    const stmt = db.prepare('INSERT INTO empleados (nombre, apellido, cedula, cargo, salario, activo) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run(nombre, apellido, cedula, cargo, salario, estadoActivo, function(err) {
        if (err) {
            if (err.message.includes('PRIMARY KEY constraint failed')) {
                return res.status(409).json({ message: 'Ya existe un empleado con esa cédula.' });
            }
            return res.status(500).json({ message: 'Error al agregar empleado.', error: err.message });
        }
        res.status(201).json({ message: 'Empleado agregado exitosamente', cedula: cedula });
    });
    stmt.finalize();
};

// Controlador para obtener todos los empleados (no cambia la lógica, solo traerá el nuevo campo)
exports.getAllEmpleados = (req, res) => {
    db.all('SELECT * FROM empleados', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener empleados.', error: err.message });
        }
        res.status(200).json(rows);
    });
};

// Controlador para obtener un empleado por CÉDULA (no cambia la lógica, solo traerá el nuevo campo)
exports.getEmpleadoByCedula = (req, res) => {
    const { cedula } = req.params;

    db.get('SELECT * FROM empleados WHERE cedula = ?', [cedula], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener empleado.', error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Empleado no encontrado.' });
        }
        res.status(200).json(row);
    });
};

// Controlador para actualizar un empleado por CÉDULA
exports.updateEmpleado = (req, res) => {
    const { cedula } = req.params;
    // <-- Incluye 'activo' en la desestructuración del body
    const { nombre, apellido, cargo, salario, activo } = req.body;

    if (!nombre || !apellido) {
        return res.status(400).json({ message: 'Nombre y Apellido son campos obligatorios.' });
    }

    // Asegura que activo sea 0 o 1
    const estadoActivo = (activo === undefined || activo === null) ? 1 : (activo ? 1 : 0);


    const stmt = db.prepare(
        'UPDATE empleados SET nombre = ?, apellido = ?, cargo = ?, salario = ?, activo = ? WHERE cedula = ?' // <-- Incluye 'activo' en el UPDATE
    );
    stmt.run(nombre, apellido, cargo, salario, estadoActivo, cedula, function(err) { // <-- Pasa 'estadoActivo'
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar empleado.', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado o no hubo cambios en los datos.' });
        }
        res.status(200).json({ message: 'Empleado actualizado exitosamente.' });
    });
    stmt.finalize();
};