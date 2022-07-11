'use strict';
const {usuarioSchema,USER_TABLE, }=require('../models/usuario.model');
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable(USER_TABLE,usuarioSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
