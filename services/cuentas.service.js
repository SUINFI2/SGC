const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class CuentasService {
  async create(data){
    const rta = await models.Cuenta.create(data);
    if(!rta){throw boom.conflict('Not Create, Error!');}
    return rta;
  }
  async find(negocioId){
    const negocio = await models.Negocio.findByPk(negocioId, {include: ['cuentas']});
    if(!negocio){throw boom.notFound('Negocio Not Found');}
    return negocio.cuentas;
  }
  async findOne(negocioId,cuentaId){
    const cuentas  = await this.find(negocioId);
    const cuenta = await cuentas.find((items) => items.id == cuentaId);
    if(!cuenta){ throw boom.notFound('Cuenta Not Found');}
     return cuenta;
  }
  async update(negocioId,cuentaId, change){
   const cuenta = await this.findOne(negocioId,cuentaId);
   const rta = await cuenta.update(change);
   return rta;
  }
  async delete(negocioId,cuentaId){
    const cuenta = await this.findOne(negocioId,cuentaId);
    const rta = await cuenta.destroy();
    return rta;
  }
}
module.exports = CuentasService;
