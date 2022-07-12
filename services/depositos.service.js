const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class DepositosService {
  async create(negocioId,data){}
  async find(negocioId){}
  async findOne(negocioId,depositoId){}
  async update(negocioId,depositoId,changes){}
  async delete(negocioId,depositoId){}
}
module.exports = DepositosService;
