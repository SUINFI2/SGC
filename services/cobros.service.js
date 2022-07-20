const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class CobrosService {
  async create(data){

    console.log(data);
    const dat = await models.Cobro.create(data);
    return dat;
  }
   async find(id){

      const negocio  = await models.Negocio.findByPk(id,{include:['cobros']});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.cobros;
    }
  async findOne(negocioId,cobroId){
    const cobros  = await this.find(negocioId);
    const cobro = await cobros.find((items) => items.id == cobroId);
    if(!cobro){ throw boom.notFound('cobro Not Found');}
     return cobro;
  }
  async update(negocioId,cobroId, change){
   const cobro = await this.findOne(negocioId,cobroId);
   const rta = await cobro.update(change);
   return rta;
  }
  async delete(negocioId,cobroId){
    const cobro = await this.findOne(negocioId,cobroId);
    const rta = await cobro.destroy();
    return rta;
  }
}
module.exports = CobrosService;
