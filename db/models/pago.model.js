const {Model,DataTypes, Sequelize} = require('sequelize');
const {NEGOCIO_TABLE}=require('../models/negocio.model');
const {CUENTA_TABLE}=require('../models/cuenta.model');
const PAGO_TABLE = 'pagos';
const pagoSchema  = {
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
  proveedorId:{
    field: 'cuenta_id_debe',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUENTA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  cuentaId:{
    field: 'cuenta_id_haber',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUENTA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  monto: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Pago extends Model{
  // crear metodos estaticos
  static associate(models){
    this.belongsTo(models.Negocio, {as: 'negocio'});
   this.belongsTo(models.Cuenta, {as: 'cuenta'});
   this.belongsTo(models.Proveedor, {as: 'proveedor'});
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  PAGO_TABLE,
      modelName: 'Pago',
      timestamps: false
    }
  }
}
module.exports = {
  PAGO_TABLE,
  pagoSchema,
  Pago
}
