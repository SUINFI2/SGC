const {Model,DataTypes, Sequelize} = require('sequelize');
const {NEGOCIO_TABLE}=require('../models/negocio.model');
const PROVEEDOR_TABLE = 'proveedores';
const proveedorSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  negocioId:{
    field: 'negocio_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: NEGOCIO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  celular: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  direccion: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Proveedor extends Model{
  // crear metodos estaticos
  static associate(models){
    this.belongsTo(models.Negocio, {as: 'negocio'});

  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  PROVEEDOR_TABLE,
      modelName: 'Proveedor',
      timestamps: false
    }
  }
}
module.exports = {
  PROVEEDOR_TABLE,
  proveedorSchema,
  Proveedor
}
