
module.exports = (sequelize, DataTypes) => {
  const Empleado = sequelize.define('Empleado', {
    nombre: DataTypes.STRING,
    cedula: DataTypes.STRING,          
    telefono: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    direccion: DataTypes.STRING,
    cargo: DataTypes.STRING,
    salario: DataTypes.FLOAT,         
    fechaContratacion: DataTypes.DATE,
    tipoContrato: DataTypes.STRING    
  });
  Empleado.associate = models => {
    Empleado.hasMany(models.Anotacion); 
  };
  return Empleado;
};