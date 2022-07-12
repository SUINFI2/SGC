const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class ImpresorasService {
  async create(negocioId,data){}
  async find(negocioId){}
  async findOne(negocioId,impresoraId){}
  async update(negocioId,impresoraId,changes){}
  async delete(negocioId,impresoraId){}
}
module.exports = ImpresorasService;
