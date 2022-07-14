const {Model,DataTypes, Sequelize} = require('sequelize');
const {NEGOCIO_TABLE}=require('../models/negocio.model');
const {CUENTA_TABLE}=require('../models/cuenta.model');
const CLIENTE_TABLE = 'clientes';
const clienteSchema  = {
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
  cuentaId:{
    field: 'cuenta_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: CUENTA_TABLE,
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

class Cliente extends Model{
  // crear metodos estaticos
  static associate(models){
    this.belongsTo(models.Negocio, {as: 'negocio'});
    this.belongsTo(models.Cuenta, {as: 'cuenta'});

  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  CLIENTE_TABLE,
      modelName: 'Cliente',
      timestamps: false
    }
  }
}
module.exports = {
  CLIENTE_TABLE,
  clienteSchema,
  Cliente
}
