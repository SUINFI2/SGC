const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class PagosService {
  async create(data){

    console.log(data);
    const dat = await models.Pago.create(data);
    return dat;
  }
   async find(id){

      const negocio  = await models.Negocio.findByPk(id,{include:['pagos']});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.pagos;
    }
  async findOne(negocioId,pagoId){
    const pagos  = await this.find(negocioId);
    const pago = await pagos.find((items) => items.id == pagoId);
    if(!pago){ throw boom.notFound('pago Not Found');}
     return pago;
  }
  async update(negocioId,pagoId, change){
   const pago = await this.findOne(negocioId,pagoId);
   const rta = await pago.update(change);
   return rta;
  }
  async delete(negocioId,pagoId){
    const pago = await this.findOne(negocioId,pagoId);
    const rta = await pago.destroy();
    return rta;
  }
}
module.exports = PagosService;
