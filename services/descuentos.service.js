const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class DescuentosService {
  async create(data){
    const dat = await models.Descuento.create(data);
    return dat;
  }
   async find(id){
      const negocio  = await models.Negocio.findByPk(id,{include:['descuentos']});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.descuentos;
    }
  async findOne(negocioId,descuentoId){
    const descuentos  = await this.find(negocioId);
    const descuento = await descuentos.find((items) => items.id == descuentoId);
    if(!descuento){ throw boom.notFound('descuento Not Found');}
     return descuento;
  }
  async update(negocioId,descuentoId, change){
   const descuento = await this.findOne(negocioId,descuentoId);
   const rta = await descuento.update(change);
   return rta;
  }
  async delete(negocioId,descuentoId){
    const descuento = await this.findOne(negocioId,descuentoId);
    const rta = await descuento.destroy();
    return rta;
  }
}
module.exports = DescuentosService;
