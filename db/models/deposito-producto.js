const { Model, DataTypes, Sequelize } = require('sequelize');

const { DEPOSITO_TABLE } = require('./deposito.model');
const { PRODUCTO_TABLE } = require('./producto.model');

const DEPOSITO_PRODUCTO_TABLE = 'depositos_productos';

const depositoProductoSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  depositoId: {
    field: 'deposito_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: DEPOSITO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productoId: {
    field: 'producto_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCTO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  cantidad: {
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
}

class DepositoProducto extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DEPOSITO_PRODUCTO_TABLE,
      modelName: 'DepositoProducto',
      timestamps: false
    }
  }
}

module.exports = { DepositoProducto, depositoProductoSchema, DEPOSITO_PRODUCTO_TABLE };
