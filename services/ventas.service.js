const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class VentasService {
  async create(data){
    const dat = await models.Venta.create(data);
    return dat;
  }
  async addItem(data){
    const dat = await models.VentaProducto.create(data);
    const venta = await models.Venta.findByPk(data.ventaId,{
      include:['items']
  });
 const total =  await venta.calcularTotal();
 const rta = await venta.update({total});
    return rta;
  }
  async subtractItems(data){
    const items = await models.VentaProducto.findAll({
      where:{
        ventaId: data.ventaId,
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
      association: 'ventas',
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

    const {confirmDeposito,confirmCobro} = query;
    if(confirmDeposito && confirmCobro){
      options.where.confirmCobro= confirmCobro;
      options.where.confirmDeposito = confirmDeposito;
    }else{
      if(confirmDeposito){options.where.confirmDeposito = confirmDeposito;}
    }

      const negocio  = await models.Negocio.findByPk(id,{include:[options]});
      if(!negocio){ throw boom.notFound('Ventas Not Found');}
      return negocio.ventas;
    }
  async findOne(negocioId,ventaId){
    const venta = await models.Venta.findByPk(ventaId,{
      include:[{association: 'cliente'},'items']
    });
    if(!venta){ throw boom.notFound('venta Not Found');}

    if(venta.negocioId!=negocioId){venta={};}
     return venta;
  }
  async update(negocioId,ventaId, change){
   const venta = await this.findOne(negocioId,ventaId);
   const rta = await venta.update(change);
   return rta;
  }
  async delete(negocioId,ventaId){
    const venta = await this.findOne(negocioId,ventaId);
    venta.items.forEach(async(item) => {
      await item.VentaProducto.destroy();
    });
    const rta = await venta.destroy();
    return rta;
  }
}
module.exports = VentasService;
