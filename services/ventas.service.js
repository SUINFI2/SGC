const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class VentasService {
  async create(negocioId,data){}
  async find(negocioId){}
  async findOne(negocioId,ventaId){}
  async update(negocioId,ventaId,changes){}
  async delete(negocioId,ventaId){}
}
module.exports = VentasService;
