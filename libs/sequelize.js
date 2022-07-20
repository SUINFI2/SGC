const { Sequelize } = require('sequelize');
const setupModels = require('../db/models/index');
const { config } = require('../config/config');
const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}
// ya pasamos pooling por detras, pero debemos pasar adicion un
//variallme llamada dialect
const sequelize = new Sequelize(config.dbUrl, options);
//(( le envia la conexion))
/*sequelize.createSchema('cliente2',{
  logging: true
}) */
setupModels(sequelize);
//sequelize.sync(); borrar para realizar las migraciones correctamente

module.exports = sequelize;
