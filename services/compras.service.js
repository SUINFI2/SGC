const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');
class ComprasService {
  async create(data) {
    const rta = await this.controlledByCreate(data);
    if (rta != true) {
      return boom.conflict();
    }
    const dat = await models.Compra.create(data);
    if (!dat) {
      throw boom.notFound('Create Compra Not Found');
    }
    return dat;
  }
  async addItem(data) {
    const { compra } = await this.controlledByAddItem(data);

    const dat = await models.CompraProducto.create(data);
    if (!dat) {
      return boom.notFound('CompraProducto Not Found');
    }
    const total = (await compra.calcularTotal()) + data.cantidad * data.costo;
    const rta = await compra.update({ total });

    return rta;
  }
  async subtractItems(data) {
    const { compra, err } = await this.controlledByAddItem(data);
    if (!compra) {
      return boom.conflict(err);
    }

    const items = await models.CompraProducto.findAll({
      where: {
        compraId: data.compraId,
        productoId: data.productoId,
      },
    });
    items.forEach(async (item) => {
      await item.destroy();
    });

    const xcompra = await models.Compra.findByPk(data.compraId, {
      include: ['items'],
    });
    if (!xcompra) {
      return boom.notFound('Compra Not Found');
    }
    const total = await xcompra.calcularTotal();
    const newCompra = await xcompra.update({ total });
    if (!newCompra) {
      return boom.notFound('Updated Compra Not Found');
    }
    return newCompra;
  }
  async updateItem(data) {
    const { compra, err } = await this.controlledByAddItem(data);
    if (!compra) {
      return boom.conflict(err);
    }
    const items = await models.CompraProducto.findAll({
      where: {
        compraId: data.compraId,
        productoId: data.productoId,
      },
    });
    items.forEach(async (item) => {
      await item.update(data.cantidad);
    });
    const xcompra = await models.Compra.findByPk(data.compraId, {
      include: ['items'],
    });
    if (!xcompra) {
      return boom.notFound('Compra Not Found');
    }
    const total = await xcompra.calcularTotal();
    const newCompra = await xcompra.update({ total });
    if (!newCompra) {
      return boom.notFound('Updated Compra Not Found');
    }
    return newCompra;
  }
  async find(id, query) {
    const options = {
      association: 'compras',
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { fecha } = query;
    if (fecha) {
      options.where.createdAt = {
        [Op.gte]: fecha,
        //[Op.lte]: fecha
      };
    }

    const { confirmDeposito, confirmPago } = query;
    if (confirmDeposito && confirmPago) {
      options.where.confirmPago = confirmPago;
      options.where.confirmDeposito = confirmDeposito;
    } else {
      if (confirmDeposito) {
        options.where.confirmDeposito = confirmDeposito;
      }
    }
    const negocio = await models.Negocio.findByPk(id, { include: [options] });
    if (!negocio) {
      throw boom.notFound('Compras Not Found');
    }
    return negocio.compras;
  }
  async findOne(negocioId, compraId, query) {
    var options = {
      include: [],
    };
    console.log('------> aqui');
    const { proveedor, items, pagos } = query;
    if (proveedor) {
      options.include.push('proveedor');
    }
    if (items) {
      options.include.push('items');
    }
    if (pagos) {
      options.include.push('pagos');
    }
    const compra = await models.Compra.findByPk(compraId, options);

    if (!compra) {
      throw boom.notFound('Compra Not Found');
    }
    if (compra.negocioId != negocioId) {
      compra = {};
    }
    console.log(compra.items);
    if (!compra) {
      throw boom.notFound('compra Not Found');
    }
    return compra;
  }

  async delete(negocioId, compraId) {
    const compra = await this.findOne(negocioId, compraId, {items:true, pagos:true});


    compra.items.forEach(async (item) => {
    await item.CompraProducto.destroy();
    });
    compra.pagos.forEach(async (item) => {
      await item.destroy();
    });
    const rta = await compra.destroy();
    return compra;
  }
  async controlledByCreate(data) {
    const proveedor = await models.Proveedor.findByPk(data.proveedorId);
    if (!proveedor) {
      throw boom.notFound('Proveedor Not Found');
    }
    if (proveedor.negocioId != data.negocioId) {
      throw boom.conflict('Proveedor no perteneece al negocio');
    }

    const usuario = await models.Usuario.findByPk(data.usuarioId);
    if (!usuario) {
      throw boom.notFound('usuario not found');
    }
    if (usuario.negocioId != data.negocioId) {
      throw boom.conflict('usuario no perteneece al negocio');
    }
    return true;
  }
  async controlledByAddItem(data) {
    const compra = await models.Compra.findByPk(data.compraId, {
      include: ['items'],
    });

    if (!compra) {
      throw boom.notFound('Compra Not Found');
    }
    const producto = await models.Producto.findByPk(data.productoId);
    if (!producto) {
      throw boom.notFound('producto Not Found');
    }
    if (producto.negocioId != compra.negocioId) {
      throw boom.conflict('El producto y la compra no pertenecen al mismo negocio');
    }
    if (compra.confirmDeposito) {
      throw boom.conflict('Esta Compra no puede ser modificada');
    }
    return { compra, producto };
  }
}
module.exports = ComprasService;
