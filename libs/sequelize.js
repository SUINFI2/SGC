const {Sequelize} = require('sequelize');

const setupModels = require('../db/models/index');
// pasarle cual sera la conexion
const {config} = require('../config/config');
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// ya pasamos pooling por detras, pero debemos pasar adicion un
//variallme llamada dialect
const sequelize = new Sequelize(URI,{
  dialect: 'postgres',
  logging: true
});
//(( le envia la conexion))
/*sequelize.createSchema('cliente2',{
  logging: true
}) */
setupModels(sequelize);
//sequelize.sync(); borrar para realizar las migraciones correctamente



module.exports = sequelize;
