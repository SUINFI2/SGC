const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class ClientesService {
  async create(data){
    const dat = await models.Cliente.create(data);
    return dat;
  }
   async find(id){
      const negocio  = await models.Negocio.findByPk(id,{include:['clientes']});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.clientes;
    }
  async findOne(negocioId,clienteId){
    const clientes  = await this.find(negocioId);
    const cliente = await clientes.find((items) => items.id == clienteId);
    if(!cliente){ throw boom.notFound('cliente Not Found');}
     return cliente;
  }
  async update(negocioId,clienteId, change){
   const cliente = await this.findOne(negocioId,clienteId);
   const rta = await cliente.update(change);
   return rta;
  }
  async delete(negocioId,clienteId){
    const cliente = await this.findOne(negocioId,clienteId);
    const rta = await cliente.destroy();
    return rta;
  }
}
module.exports = ClientesService;
