const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class DepositosService {
  async create(data){
    const dat = await models.Deposito.create(data);
    return dat;
  }
  async addItem(data){
    const rta = await models.DepositoProducto.create(data);
    return rta;
  }
  async subtractItems(data){
    const items = await models.DepositoProducto.findAll({
      where:{
        depositoId: data.depositoId,
        productoId: data.productoId
      }
    });
    items.forEach(async (item) => {
      await item.destroy();
    });
    return true;
  }
   async find(id){
      const negocio  = await models.Negocio.findByPk(id,{include:[
        {
          association: 'depositos',
          include:['items']
        }]});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.depositos;
    }
  async findOne(negocioId,depositoId){
    const depositos  = await this.find(negocioId);
    const deposito = await depositos.find((items) => items.id == depositoId);
    if(!deposito){ throw boom.notFound('deposito Not Found');}
     return deposito;
  }
  async update(negocioId,depositoId, change){
   const deposito = await this.findOne(negocioId,depositoId);
   const rta = await deposito.update(change);
   return rta;
  }
  async delete(negocioId,depositoId){
    const deposito = await this.findOne(negocioId,depositoId);
    const rta = await deposito.destroy();
    return rta;
  }
}
module.exports = DepositosService;
