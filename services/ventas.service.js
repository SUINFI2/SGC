const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
class VentasService {
  async create(data) {
    await this.controlledByCreate(data);
      const dat = await models.Venta.create(data);
      if (!dat) {
        throw boom.notFound('Venta Not Found');
      }
      return dat;

  }
  async addItem(data){

    const { venta , producto } = await this.controlledByAddItem(data);


    const dat = await models.VentaProducto.create(data);
    if(!dat){throw boom.notFound('ventaProducto Not Found');}

   const total = ( await venta.calcularTotal()+(data.cantidad*data.precio));
   const rta = await venta.update({total});

    return rta;
  }
  async subtractItems(data){
    const { venta } = await this.controlledByAddItem(data);


    const items = await models.VentaProducto.findAll({
      where:{
        ventaId: data.ventaId,
        productoId: data.productoId
      }
    });
    items.forEach(async (item) => {
      await item.destroy();
    });

    const xventa = await models.Venta.findByPk(data.ventaId,{include:['items']});
    if(!xventa){ return boom.notFound('venta Not Found');}
    const total = await xventa.calcularTotal();
    const newventa = await xventa.update({total});
    if(!newventa){return boom.notFound('Updated venta Not Found');}
    return newventa;
  }
  async updateItem(data){
    const { venta } = await this.controlledByAddItem(data);

    const items = await models.VentaProducto.findAll({
      where:{
        ventaId: data.ventaId,
        productoId: data.productoId
      }
    });
    items.forEach(async (item) => {
      await item.update(data.cantidad);
    });
    const xventa = await models.Venta.findByPk(data.ventaId,{include:['items']});
    if(!xventa){ return boom.notFound('venta Not Found');}
    const total = await xventa.calcularTotal();
    const newventa = await xventa.update({total});
    if(!newventa){return boom.notFound('Updated venta Not Found');}
    return newventa;
    return true;
  }
  async find(id, query) {
    const options = {
      association: 'ventas',
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

    const { confirmDeposito, confirmCobro } = query;
    if (confirmDeposito && confirmCobro) {
      options.where.confirmCobro = confirmCobro;
      options.where.confirmDeposito = confirmDeposito;
    } else {
      if (confirmDeposito) {
        options.where.confirmDeposito = confirmDeposito;
      }
    }

    const negocio = await models.Negocio.findByPk(id, { include: [options] });
    if (!negocio) {
      throw boom.notFound('Ventas Not Found');
    }
    return negocio.ventas;
  }
  async findOne(negocioId, ventaId,query) {
    var options = {
      include: [],
    };
    const { cliente, items, cobros } = query;
    if (cliente) {
      options.include.push('cliente');
    }
    if (items) {
      options.include.push('items');
    }
    if (cobros) {
      options.include.push('cobros');
    }
    const venta = await models.Venta.findByPk(ventaId, options);
    if (!venta) {
      throw boom.notFound('venta Not Found');
    }
    if (venta.negocioId != negocioId) {
      throw boom.conflict('la venta no pertence al negocio');
    }
    return venta;
  }
  async findByUser(usuarioId){
    const ventas = await models.Venta.findAll({where:{usuarioId:usuarioId}});
    if(!ventas){ throw boom.notFound('Ventas Not Found');}
    return ventas;
  }
  async update(negocioId, ventaId, change) {
    const venta = await this.findOne(negocioId, ventaId);

    if (venta.confirmCobro === false && change.confirmCobro === true) {
      console.log('Suma cuentas');
    }
    if (venta.confirmDeposito === false && change.confirmDeposito === true) {
      console.log('Resta productos de deposito');
    }

    const rta = await venta.update(change);

    return rta;
  }
  async delete(negocioId, ventaId) {
    const venta = await this.findOne(negocioId, ventaId,{items: true, cobros:true});
    venta.items.forEach(async (item) => {
      await item.VentaProducto.destroy();
    });
    venta.cobros.forEach(async (item) => {
      await item.destroy();
    });
    const rta = await venta.destroy();
    return rta;
  }
  async controlledByCreate(data) {
    const cliente = await models.Cliente.findByPk(data.clienteId);
    if (!cliente) {
      throw boom.notFound('cliente Not Found');
    }
    if (cliente.negocioId != data.negocioId) {
      throw boom.conflict('cliente no perteneece al negocio');
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

    const venta = await models.Venta.findByPk(data.ventaId, {
      include: ['items'],
    });

    if (!venta) {
      throw boom.notFound('venta Not Found');
    }
    if (venta.confirmDeposito) {
      throw boom.conflict('Esta Venta no puede ser modificada');
    }
    const producto = await models.Producto.findByPk(data.productoId);
    if (!producto) {
      throw boom.notFound('producto Not Found');
    }
    if (producto.negocioId != venta.negocioId) {
      throw boom.conflict('El producto y la venta no pertenecen al mismo negocio');
    }
    if(producto.costo >= data.precio){
      throw boom.conflict('El precio debe ser mayor al costo');

    }

    return { venta,producto };
  }
}
module.exports = VentasService;
