const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class CuentasService {
  async create(negocioId,data){}
  async find(negocioId){}
  async findOne(negocioId,cuentaId){}
  async update(negocioId,cuentaId,changes){}
  async delete(negocioId,cuentaId){}
}
module.exports = CuentasService;
