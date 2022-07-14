const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class ProveedoresService {
  async create(data){

    const dat = await models.Proveedor.create(data,{include: ['cuenta']});
    return dat;
  }
   async find(id){
      const negocio  = await models.Negocio.findByPk(id,{include:['proveedores']});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.proveedores;
    }
  async findOne(negocioId,proveedorId){
    const proveedores  = await this.find(negocioId);
    const proveedor = await proveedores.find((items) => items.id == proveedorId);
    if(!proveedor){ throw boom.notFound('proveedor Not Found');}
     return proveedor;
  }
  async update(negocioId,proveedorId, change){
   const proveedor = await this.findOne(negocioId,proveedorId);
   const rta = await proveedor.update(change);
   return rta;
  }
  async delete(negocioId,proveedorId){
    const proveedor = await this.findOne(negocioId,proveedorId);
    const rta = await proveedor.destroy();
    return rta;
  }
}
module.exports = ProveedoresService;
