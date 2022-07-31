const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class ProveedoresService {
  async create(data){
    const newData = {
      ...data,
      cuenta: {
        negocioId: data.negocioId,
        rubroId: 4,
        nombre: data.nombre
      }
    }
    const dat = await models.Proveedor.create(newData,{include: ['cuenta']});
    if(!dat){throw boom.notFound('Proveedor Not Found');}
    return dat;
  }
   async find(id){
      const negocio  = await models.Negocio.findByPk(id,{include:['proveedores']});
      if(!negocio.proveedores){ throw boom.notFound('Provedores Not Found');}
      return negocio.proveedores;
    }
  async findOne(negocioId,proveedorId,query){
    const { compras } = query;
    var options = {};
    if (compras) {
      options = {
        include:[{
          association: 'compras',
          include: ['pagos'],
          where:{confirmDeposito: true, confirmPago:false}
        }]
      };
    }
    const proveedor  = await models.Proveedor.findByPk(proveedorId,options);
    if(!proveedor){ throw boom.notFound('proveedor Not Found');}
    if(proveedor.negocioId!=negocioId){throw boom.notFound('Proveedor Not Found');}
     return proveedor;
  }
  async update(negocioId,proveedorId, change){
   const proveedor = await this.findOne(negocioId,proveedorId,{});
   const rta = await proveedor.update(change);
   return rta;
  }
  async delete(negocioId,proveedorId){
    const proveedor = await this.findOne(negocioId,proveedorId,{});
    const rta = await proveedor.destroy();
    return rta;
  }
}
module.exports = ProveedoresService;
