'use strict';
const {USUARIO_TABLE}=require('../models/usuario.model');

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn(USUARIO_TABLE,'recovery_token',{
    field: 'recovery_token',
    allowNull: true,
    type: Sequelize.DataTypes.STRING
   });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USUARIO_TABLE,'recovery_token');
  }
};
