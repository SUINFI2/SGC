const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class GastosService {
  async create(negocioId,data){}
  async find(negocioId){}
  async findOne(negocioId,gastoId){}
  async update(negocioId,gastoId,changes){}
  async delete(negocioId,gastoId){}
}
module.exports = GastosService;
