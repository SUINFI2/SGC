const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class CobrosService {
  async create(negocioId,data){}
  async find(negocioId){}
  async findOne(negocioId,cobroId){}
  async update(negocioId,cobroId,changes){}
  async delete(negocioId,cobroId){}
}
module.exports = CobrosService;
