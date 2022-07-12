'use strict';
const {CATEGORIA_TABLE,categoriaSchema}=require('../models/categoria.model');
const {NEGOCIO_TABLE, negocioSchema}=require('../models/negocio.model');
const {PRODUCTO_TABLE,productoSchema}=require('../models/producto.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(NEGOCIO_TABLE,negocioSchema);
    await queryInterface.createTable(CATEGORIA_TABLE,categoriaSchema);
    await queryInterface.createTable(PRODUCTO_TABLE,productoSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(PRODUCTO_TABLE);
    await queryInterface.dropTable(CATEGORIA_TABLE);
    await queryInterface.dropTable(NEGOCIO_TABLE);

  }
};
