const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Empleados = sequelize.define('Empleados', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
});

module.exports = Empleados;
