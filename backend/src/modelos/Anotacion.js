
module.exports = (sequelize, DataTypes) => {
  const Anotacion = sequelize.define('Anotacion', {
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    fecha: DataTypes.DATE,
    tipo: DataTypes.STRING,
    severidad: { type: DataTypes.STRING, allowNull: true }
  });
  Anotacion.associate = models => {
    Anotacion.belongsTo(models.Empleado);
  };
  return Anotacion;
};