const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
class PagosService {
  async create(data) {
    // Controla la lógica de Negocio de data
    const { compra, cuenta } = await this.controlledByCreate(data);

    //  f1 aumentar el haber la cuentas: efectivo,deposito o proveedores
    const newCuenta = await cuenta.update({
      haber: cuenta.haber + data.monto,
    });
    if (!newCuenta) {
      throw boom.notFound('Update Cuenta Not Found');
    }

    //   si no es el primer Pago
    if ((await compra.cntPagos()) > 0) {
      //  (F2) aumentar el debe la Cuenta asociada al proveedor de la compra
      const newCuentaProveedor = await compra.proveedor.cuenta.update({
        debe: compra.proveedor.cuenta.debe + data.monto,
      });
      if (!newCuentaProveedor) {
        // revertir F1
        await cuenta.update({
          haber: cuenta.haber - data.monto,
        });
        throw boom.notFound('Update Cuenta proveedor Not Found');
      }
    }

    // (F3) crear Pago
    const newPago = await models.Pago.create(data);
    if (!newPago) {
      // revertir F1
      await cuenta.update({
        haber: cuenta.haber - data.monto,
      });
      // si F2 ocurrio
      if ((await compra.cntPagos()) > 0) {
        // reevertir F2
        await compra.proveedor.cuenta.update({
          debe: compra.proveedor.cuenta.debe - data.monto,
        });
      }
      throw boom.notFound('New Pago Not Found');
    }

    // si se confirma Pago de la Compra con Cuenta del Rubro "cajas y banco"
    if (
      (await compra.totalPagado()) + data.monto === compra.total &&
      cuenta.rubroId === 1
    ) {
      // (F4) confirmar Pago en la Compra
      const newCompra = await compra.update({ confirmPago: true });
      if (!newCompra) {
        // revertir F1
        await cuenta.update({
          haber: cuenta.haber - data.monto,
        });
        // si F2 ocurrio
        if ((await compra.cntPagos()) > 0) {
          //revertir F2
          await compra.proveedor.cuenta.update({
            debe: compra.proveedor.cuenta.debe - data.monto,
          });
        }
        // revertir F3
        await newPago.destroy();
        throw boom.notFound('Update compra Not Found');
      }
    }
    return newPago;
  }
  async find(id) {
    const negocio = await models.Negocio.findByPk(id, { include: ['pagos'] });
    if (!negocio) {
      throw boom.notFound('Negocio Not Found');
    }
    return negocio.pagos;
  }
  async findOne(negocioId, pagoId) {
    const pagos = await models.Pago.findByPk(pagoId);
    if (!pago) {
      throw boom.notFound('pago Not Found');
    }
    if (pago.negocioId != negocioId) {
      throw boom.conflict('El pago no pertenece al negocio');
    }
    return pago;
  }
  async update(negocioId, pagoId, change) {
    const pago = await this.findOne(negocioId, pagoId);
    const rta = await pago.update(change);
    return rta;
  }
  async delete(negocioId, pagoId) {
    const pago = await this.findOne(negocioId, pagoId);
    const rta = await pago.destroy();
    return rta;
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
    if (cuenta.rubroId != 1 && cuenta.rubroId != 4) {
      throw boom.conflict('La cuenta no pertence al rubro correspondiente');
    }

    //compra asociada al cobro
    const compra = await models.Compra.findByPk(data.compraId, {
      include: [{ association: 'proveedor', include: ['cuenta'] }, 'pagos'],
    });
    if (!compra) {
      throw boom.notFound('compra Not Found');
    }
    if (data.negocioId != compra.negocioId) {
      throw boom.conflict('La compra no pertenece al negocio');
    }
    if (!compra.confirmDeposito) {
      throw boom.conflict('La compra haber ser confirmada por deposito, antes de realizar el cobro');
    }
    if (compra.confirmPago) {
      throw boom.conflict('compra ya pagada');
    }
    if ((await compra.cntPagos()) === 0) {
      if (compra.total != data.monto) {
        throw boom.notAcceptable('En el primer cobro el monto debe ser igual al total de la boleta');
      }
    } else {
      if (cuenta.rubroId === 4) {
        throw boom.conflict('No se puede realizar mas de un pago con proveedores a una misma compra');
      }
      if (data.monto > compra.total - (await compra.totalPagado())) {
        throw boom.conflict('El monto supera el valor de la deuda');
      }
    }
    if (cuenta.rubroId=== 4 && cuenta.id != compra.proveedor.cuentaId) {
      throw boom.conflict('La Cuenta No pertenece al Proveedor de la Compra');
     }
    return { compra, cuenta };
  }
}
module.exports = PagosService;
