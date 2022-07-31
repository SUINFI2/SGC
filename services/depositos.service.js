const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const productosService = require('./productos.service');
const service = new productosService();
class DepositosService {
  async create(data) {
    const dat = await models.Deposito.create(data);
    return dat;
  }
  async addItem(data) {
    const rta = await models.DepositoProducto.create(data);
    return rta;
  }
  async subtractItem(depositoId, productoId) {
    const items = await models.DepositoProducto.findAll({
      where: {
        depositoId: depositoId,
        productoId: productoId,
      },
    });
    if (!items) {
      throw boom.notFound('El produto no pertenece al deposito');
    }
    items.forEach(async (item) => {
      await item.destroy();
    });
    return true;
  }
  async updateItem(data) {
    const items = await models.DepositoProducto.findAll({
      where: {
        depositoId: data.depositoId,
        productoId: data.productoId,
      },
    });

    items.forEach(async (item) => {
      await item.update({
        cantidad: (item.cantidad+data.cantidad)
      });
    });
    return true;
  }
  async find(id) {
    const negocio = await models.Negocio.findByPk(id, {
      include: [
        {
          association: 'depositos',
          include: ['items'],
        },
      ],
    });
    if (!negocio) {
      throw boom.notFound('Negocio Not Found');
    }
    return negocio.depositos;
  }
  async findOne(negocioId, depositoId) {
    const depositos = await models.Dposito.findByPk(depositoId);
    if (!deposito) {
      throw boom.notFound('deposito Not Found');
    }
    if(deposito.negocioId!=negocioId){throw boom.conflict('El Deposito no pertence al Negocio');}
    return deposito;
  }
  async update(negocioId, depositoId, change) {
    const deposito = await this.findOne(negocioId, depositoId);
    const rta = await deposito.update(change);
    return rta;
  }
  async delete(negocioId, depositoId) {
    const deposito = await this.findOne(negocioId, depositoId);
    const rta = await deposito.destroy();
    if(!rta){throw boom.notFound('Delete Deposito Not Found');}
    return rta;
  }
  async confirmPutDeposito(data) {

    const {compra, err}= await this.controlledByConfirmPut(data);
    if(!compra){ return boom.conflict(err);}

    compra.items.forEach(async (item) => {


      await this.updateItem({
        depositoId: data.depositoId,
        productoId: item.CompraProducto.productoId,
        cantidad: item.CompraProducto.cantidad
      })

      const newProducto =await service.update(compra.negocioId, item.CompraProducto.productoId,{costo: item.CompraProducto.costo});

    });
    const rta = await compra.update({confirmDeposito: true});

    return rta;
  }
  async confirmOutDeposito(data) {

    const {venta }= await this.controlledByConfirmOut(data);

    venta.items.forEach(async (item) => {
      await this.updateItem({
        depositoId: data.depositoId,
        productoId: item.VentaProducto.productoId,
        cantidad: (item.VentaProducto.cantidad*-1)
      });
    });
    const rta = await venta.update({confirmDeposito: true});
    return rta;
  }

  async controlledByConfirmPut(data){
    const compra = await models.Compra.findByPk(data.compraId, {
      include: ['items'],
    });
    if (!compra) {
      return {err:'Compra Not Found'}
    }
    if (compra.negocioId != data.negocioId) {
      return {err:'La compra no pertenece al negocio'}
    }
    if (compra.confirmDeposito) {
      return {err:'La compra ya confirmada'}
    }

    const deposito = await models.Deposito.findByPk(data.depositoId);
    if (!deposito) {
      return {err:'Compra Not Found'}
    }
    if (deposito.negocioId != data.negocioId) {
      return {err:'El deposito no pertenece al negocio'}
    }
    return {compra};
  }
  async controlledByConfirmOut(data){
    const venta = await models.Venta.findByPk(data.ventaId, {
      include: ['items'],
    });
    if (!venta) {
      throw boom.notFound('venta Not Found');
    }
    if (venta.negocioId != data.negocioId) {
      throw boom.conflict('La venta no pertenece al negocio');
    }
    if (venta.confirmDeposito) {
      throw boom.conflict('La venta ya confirmada');
    }

    const deposito = await models.Deposito.findByPk(data.depositoId);
    if (!deposito) {
      throw boom.notFound('deposito Not Found');
    }
    if (deposito.negocioId != data.negocioId) {
      throw boom.conflict('El deposito no pertenece al negocio');
    }
    return {venta};
  }
}
module.exports = DepositosService;
