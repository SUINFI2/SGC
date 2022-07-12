const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class ComprasService {
  async create(negocioId,data){}
  async find(negocioId){}
  async findOne(negocioId,compraId){}
  async update(negocioId,compraId,changes){}
  async delete(negocioId,compraId){}
}
module.exports = ComprasService;
