const { models } = require('../libs/sequelize');
const {Op}=require('sequelize');
const boom = require('@hapi/boom');
const { options } = require('joi');
class ClientesService {
  async create(data) {
    const newData = {
      ...data,
      cuenta: {
        negocioId: data.negocioId,
        rubroId: 3,
        nombre: data.nombre,
      },
    };
    const rta = await models.Cliente.create(newData, { include: ['cuenta'] });
    if (!rta) {
      throw boom.notFound('Cliente Not Found');
    }
    return rta;
  }
  async find(negocioId) {
    const negocio = await models.Negocio.findByPk(negocioId, {
      include: ['clientes'],
    });
    if (!negocio) {
      throw boom.notFound('Negocio Not Found');
    }
    return negocio.clientes;
  }
  async findOne(negocioId, clienteId, query) {
    const { ventas } = query;
    var options = {};
    if (ventas) {
      options = {
        include:[{
          association: 'ventas',
          include: ['cobros'],
          where:{confirmDeposito: true, confirmCobro:false}
        }]
      };
    }
    const cliente = await models.Cliente.findByPk(clienteId,options);
    if (!cliente) {
      throw boom.notFound('cliente Not Found');
    }
    if (cliente.negocioId != negocioId) {
      throw boom.conflict('El cliente no pertenece al negocio');
    }
    return cliente;
  }
  async update(negocioId, clienteId, change) {
    const cliente = await this.findOne(negocioId, clienteId, {});
    const rta = await cliente.update(change);
    if(!rta){throw boom.notFound('Update Cliente Not Found');}
    return rta;
  }
  async delete(negocioId, clienteId) {
    const cliente = await this.findOne(negocioId, clienteId, {});
    const rta = await cliente.destroy();
    return rta;
  }
}
module.exports = ClientesService;
