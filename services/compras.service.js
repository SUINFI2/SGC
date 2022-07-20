const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
const {Op}=require('sequelize');
class ComprasService {
  async create(data){
    const dat = await models.Compra.create(data);

    return dat;
  }
  async addItem(data){
    const dat = await models.CompraProducto.create(data);
    const compra = await models.Compra.findByPk(data.compraId,{
        include:['items']
    });
   const total =  await compra.calcularTotal();
   const rta = await compra.update({total});

    return rta;
  }
  async subtractItems(data){
    const items = await models.CompraProducto.findAll({
      where:{
        compraId: data.compraId,
        productoId: data.productoId
      }
    });
    items.forEach(async (item) => {
      await item.destroy();
    });
    return true;
  }
   async find(id,query){

    const options= {
      association: 'compras',
      where:{}
    };
    const {limit,offset} = query;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    const {fecha} = query;
    if(fecha){ options.where.createdAt= {
      [Op.gte]: fecha,
      //[Op.lte]: fecha
    }}

    const {confirmDeposito,confirmPago} = query;
    if(confirmDeposito && confirmPago){
      options.where.confirmPago= confirmPago;
      options.where.confirmDeposito = confirmDeposito;
    }else{
      if(confirmDeposito){options.where.confirmDeposito = confirmDeposito;}
    }
      const negocio  = await models.Negocio.findByPk(id,{include:[options]});
      if(!negocio){ throw boom.notFound('Compras Not Found');}
      return negocio.compras;
    }
  async findOne(negocioId,compraId){
    const compra = await models.Compra.findByPk(compraId,{
      include:[{association: 'proveedor'},'items']
    });

    if(!compra){ throw boom.notFound('Compra Not Found');}
    if(compra.negocioId!=negocioId){compra={};}
    console.log(compra.items);
    if(!compra){ throw boom.notFound('compra Not Found');}
     return compra;
  }
  async update(negocioId,compraId, change){
   const compra = await this.findOne(negocioId,compraId);
   const rta = await compra.update(change);
   return rta;
  }
  async delete(negocioId,compraId){
    const compra = await this.findOne(negocioId,compraId);
    compra.items.forEach(async (item) => {
      await item.CompraProducto.destroy();
    });
    const rta = await compra.destroy();
    return rta;
  }
}
module.exports = ComprasService;
