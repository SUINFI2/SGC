const joi = require('joi');
const compraId = joi.number().positive();
const negocioId = joi.number().positive();
const proveedorId = joi.number().positive();
const productoId = joi.number().integer();
const usuarioId = joi.number().positive();
const fechaEntrega =  joi.date();
const fecha = joi.date();
const cantidad = joi.number().positive();
const costo = joi.number().positive();
const confirmDeposito = joi.boolean();
const confirmPago = joi.boolean();
const limit = joi.number().integer();
const offset = joi.number().integer();
const createcompraSchema = joi.object({
  negocioId: negocioId.required(),

  proveedorId: proveedorId.required(),
  usuarioId: usuarioId.required(),
  fechaEntrega: fechaEntrega
});
const updatecompraSchema = joi.object({
  fechaEntrega,
  confirmDeposito,
  confirmPago
});
const getcompraSchema = joi.object({
  negocioId: negocioId.required(),
  compraId: compraId.required()
});

const addItemSchema = joi.object({
  compraId: compraId.required(),
  productoId: productoId.required(),
  cantidad: cantidad.required(),
  costo: costo.required()

});
const subractItemSchema = joi.object({
  compraId: compraId.required(),
  productoId: productoId.required()

});
const queryCompraSchema = joi.object({
  limit,
  offset,
  fecha,
  confirmDeposito,
  confirmPago: confirmPago.when('confirm_deposito',{
    is: true,
    then: joi.required()
  })
});

module.exports = {
  createcompraSchema,
  updatecompraSchema,
  getcompraSchema,
  addItemSchema,
  queryCompraSchema,
  subractItemSchema
  };
