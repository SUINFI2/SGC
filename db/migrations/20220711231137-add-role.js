'use strict';
const {usuarioSchema,USER_TABLE, }=require('../models/usuario.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'role', usuarioSchema.role);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
