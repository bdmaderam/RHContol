const { Sequelize } = require('sequelize');
const sequelize = require('./backend/src/configuracion/baseDeDatos');
const Empleado = require('./backend/src/modelos/Empleado')(sequelize, Sequelize.DataTypes);
const Anotacion = require('./backend/src/modelos/Anotacion')(sequelize, Sequelize.DataTypes);
// Agrega esto antes de sync()

(async () => {
  try {

    
    // 1. Sincronizar modelos (¡force: true resetea la DB!)
    await sequelize.sync({ force: true });
    console.log('🔄 Tablas creadas');

    // 2. Insertar empleados (campos desde agregarEmpleado.jsx)
    const empleados = await Empleado.bulkCreate([
      {
        nombre: 'María González',
        cedula: '1234567890',          // Campo de formulario
        telefono: '3001234567',
        email: 'maria@empresa.com',
        direccion: 'Calle 123 #45-67',  // Todos estos campos deben coincidir
        cargo: 'Asistente de RH',       // con tu modelo Sequelize
        salario: 3500000,
        fechaContratacion: new Date(2023, 5, 15),
        tipoContrato: 'Término fijo'    // Ej: 'Indefinido', 'Prestación servicios'
      },
      {
        nombre: 'Pedro Sánchez',
        cedula: '0987654321',
        telefono: '3109876543',
        email: 'pedro@empresa.com',
        direccion: 'Carrera 8 #12-34',
        cargo: 'Reclutador',
        salario: 4200000,
        fechaContratacion: new Date(2024, 0, 10),
        tipoContrato: 'Indefinido'
      }
    ]);
    console.log(`👥 ${empleados.length} empleados insertados`);

    // 3. Insertar anotaciones (campos desde agregarAnotacion.jsx)
    await Anotacion.bulkCreate([
      {
        titulo: 'Incumplimiento horario',
        descripcion: 'Llegadas recurrentes tarde los lunes',
        fecha: new Date(2024, 2, 5),
        empleadoId: 1,                  // Relación con María González
        tipo: 'Llamado de atención',    // Ej: 'Felicitación', 'Amonestación'
        severidad: 'Media'              // Si aplica
      },
      {
        titulo: 'Empleado del mes',
        descripcion: 'Por excelente desempeño en marzo',
        fecha: new Date(2024, 3, 1),
        empleadoId: 2,                  // Relación con Pedro Sánchez
        tipo: 'Reconocimiento',
        severidad: null                 // Campo opcional
      }
    ]);
    console.log('📝 Anotaciones de ejemplo creadas');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();