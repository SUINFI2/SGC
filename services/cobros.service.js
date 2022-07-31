const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
class CobrosService {
  async create(data) {
    // Controla la lógica de Negocio de data
    const { venta, cuenta } = await this.controlledByCreate(data);

    //  (F!) aumentar el debe la cuenta asociada a la venta
    const newCuenta = await cuenta.update({
      debe: cuenta.debe + data.monto,
    });
    if (!newCuenta) {
      return boom.notFound('Update Cuenta Not Found');
    }

    //   si no es el primer cobro
    if ((await venta.cntCobros()) > 0) {
      //  (F2) aumentar el haber la Cuenta asociada al Cliente de la Venta
      const newCuentaCliente = await venta.cliente.cuenta.update({
        haber: venta.cliente.cuenta.haber + data.monto,
      });

      if (!newCuentaCliente) {
        throw boom.notFound('Update Cuenta Cliente Not Found');
      }
    }

    // (F3) crear cobro
    const newCobro = await models.Cobro.create(data);
    if (!newCobro) {
      // revertir F!
      await cuenta.update({
        debe: cuenta.debe - data.monto,
      });
      // si F2 ocurrio
      if ((await venta.cntCobros()) > 0) {
        // revertur F2
        await venta.cliente.cuenta.update({
          haber: venta.cliente.cuenta.haber - data.monto,
        });
      }
      throw boom.notFound('New Cobro Not Found');
    }

    // si se confirma Cobro de la Venta con Cuenta del Rubro "cajas y banco"
    if (
      (await venta.totalCobrado()) + data.monto === venta.total &&
      cuenta.rubroId === 1
    ) {
      // (F4) confirmar Cobro en la Venta
      const newVenta = await venta.update({ confirmCobro: true });
      if (!newVenta) {
        // revertir F1
        await cuenta.update({
          debe: cuenta.debe - data.monto,
        });
        // si F2 ocurrio
        if ((await venta.cntCobros()) > 0) {
          // revertir F2
          await venta.cliente.cuenta.update({
            haber: venta.cliente.cuenta.haber - data.monto,
          });
        }
        // reverir F3
        await newCobro.destroy();
        throw boom.notFound('Update Venta Not Found');
      }
    }
    return newCobro;
  }
  async find(id) {
    const negocio = await models.Negocio.findByPk(id, { include: ['cobros'] });
    if (!negocio.cobros) {
      throw boom.notFound('Cobros Not Found');
    }
    return negocio.cobros;
  }
  async findOne(negocioId, cobroId) {
    const cobro = await models.Cobro.findByPk(cobroId);
    if (!cobro) {
      throw boom.notFound('cobro Not Found');
    }
    if (cobro.negocioId != negocioId) {
      throw boom.conflict('cobro no pertence al negocio');
    }
    return cobro;
  }
  async delete(negocioId, cobroId) {
    const cobro = await models.Cobro.findByPk(cobroId, { include: ['venta'] });
    if (!cobro) {
      throw boom.notFound('Cobro Not Found');
    }
    if (cobro.negocioId != negocioId) {
      throw boom.conflict('El Cobro no pertenece al Negocio');
    }
    if (cobro.venta.confirmCobro) {
      const newVenta = await cobro.venta.update({ confirmCobro: false });
      if (!newVenta) {
        throw boom.notFound('Update Venta Not Found');
      }
    }
    const cuenta = await models.Cuenta.findByPk(cobro.cuentaId);
    const newCuenta = await cuenta.update({ debe: cuenta.debe - cobro.monto });
    if (!newcuenta) {
      throw boom.notFound('Update Cuenta Not Found');
    }
    if (cuenta.rubroId === 3) {
      const cliente = await models.Cliente.findByPk(cobro.clienteId, {
        include: ['cuenta'],
      });
      if (!cliente) {
        throw boom.notFound('Cliente Not Found');
      }
      const NewCliente = await cliente.cuenta.update({
        debe: cliente.cuenta.debe - cobro.monto,
      });
      if (!NewCliente) {
        throw boom.notFound('Update Cuenta Cliente Not Found');
      }
    }

    /*


    const rta = await cobro.destroy();
    if(!rta){throw boom.notFound('Update Cobro Not Found');}*/
    return cobro;
  }
  async controlledByCreate(data) {
    // Cuenta asociado al cobro
    const cuenta = await models.Cuenta.findByPk(data.cuentaId);
    if (!cuenta) {
      throw boom.notFound('Cuenta Not Found');
    }
    if (data.negocioId != cuenta.negocioId) {
      throw boom.conflict('la cuenta no pertenence al negocio');
    }
    if (cuenta.rubroId != 1 && cuenta.rubroId != 3) {
      throw boom.conflict('La cuenta no pertence al rubro correspondiente');
    }

    //Venta asociada a: cliente, cuentaCliente y Cobros
    const venta = await models.Venta.findByPk(data.ventaId, {
      include: [{ association: 'cliente', include: ['cuenta'] }, 'cobros'],
    });
    if (!venta) {
      throw boom.notFound('Venta Not Found');
    }
    if (data.negocioId != venta.negocioId) {
      throw boom.conflict('La venta no pertenece al negocio');
    }
    if (!venta.confirmDeposito) {
      throw boom.conflict(
        'La venta debe ser confirmada por deposito, antes de realizar el cobro'
      );
    }
    if (venta.confirmCobro) {
      throw boom.conflict('Venta ya cobrada');
    }
    if ((await venta.cntCobros()) === 0) {
      if (venta.total != data.monto) {
        throw boom.notAcceptable(
          'En el primer cobro el monto debe ser igual al total de la boleta'
        );
      }
    } else {
      if (cuenta.rubroId === 3) {
        throw boom.conflict(
          'No se puede realizar mas de un cobro de credito por venta'
        );
      }
      if (data.monto > venta.total - (await venta.totalCobrado())) {
        throw boom.conflict('El monto supera el valor de la deuda');
      }
    }
    if (cuenta.rubroId === 3 && cuenta.id != venta.cliente.cuentaId) {
      throw boom.conflict('La Cuenta No pertenece al Cliente de la Venta');
    }

    return { venta, cuenta };
  }
}
module.exports = CobrosService;
