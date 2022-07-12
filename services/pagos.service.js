const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class PagosService {
  async create(negocioId,data){}
  async find(negocioId){}
  async findOne(negocioId,pagoId){}
  async update(negocioId,pagoId,changes){}
  async delete(negocioId,pagoId){}
}
module.exports = PagosService;
