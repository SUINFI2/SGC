const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
}
console.log('aqui 21');
if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}
console.log('aqui 22');
const sequelize = new Sequelize(config.dbUrl,options);

console.log('aqui 23');
setupModels(sequelize);


module.exports = sequelize;
