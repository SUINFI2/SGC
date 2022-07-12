const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class DescuentosService {
  async create(negocioId,data){}
  async find(negocioId){}
  async findOne(negocioId,descuentoId){}
  async update(negocioId,descuentoId,changes){}
  async delete(negocioId,descuentoId){}
}
module.exports = DescuentosService;
