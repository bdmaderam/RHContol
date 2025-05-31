const sequelize = require('./src/database/db');
const Product = require('./src/models/Product');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de datos creada');

    await Product.bulkCreate([
      { name: 'Laptop', price: 999.99, description: '16GB RAM', stock: 10 },
      { name: 'Mouse', price: 25.50, description: 'Inalámbrico', stock: 50 },
      { name: 'Teclado', price: 45.00, description: 'Mecánico', stock: 30 },
      { name: 'Monitor', price: 199.99, description: '24" Full HD', stock: 15 }
    ]);

    console.log('Productos insertados');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();