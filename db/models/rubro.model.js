const {Model,DataTypes, Sequelize} = require('sequelize');
const RUBRO_TABLE = 'rubros';
const rubroSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  }
}

class Rubro extends Model{
  // crear metodos estaticos
  static associate(models){
    this.hasMany(models.Cuenta , { as: 'cuentas', foreignKey: 'rubroId'});
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  RUBRO_TABLE,
      modelName: 'Rubro',
      timestamps: false
    }
  }
}
module.exports = {
  RUBRO_TABLE,
  rubroSchema,
  Rubro
}
