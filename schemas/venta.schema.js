 const joi = require('joi');
const ventaId = joi.number().positive();
const negocioId = joi.number().positive();
const clienteId = joi.number().positive();
const productoId = joi.number().integer();
const usuarioId = joi.number().positive();
const fechaEntrega =  joi.date();
const cantidad = joi.number().positive();
const precio = joi.number().positive();
const confirmDeposito = joi.boolean();
const confirmCobro = joi.boolean();
const fecha = joi.date();
const limit = joi.number().integer();
const offset = joi.number().integer();
const cobros = joi.boolean();
const items = joi.boolean();
const cliente = joi.boolean();

const createventaSchema = joi.object({
  negocioId: negocioId.required(),
  clienteId: clienteId.required(),
  usuarioId: usuarioId.required(),
  fechaEntrega: fechaEntrega
});
const updateventaSchema = joi.object({
  fechaEntrega,
  confirmDeposito,
  confirmCobro
});
const getventaSchema = joi.object({
  negocioId: negocioId.required(),
  ventaId: ventaId.required()
});

const addItemSchema = joi.object({
  ventaId: ventaId.required(),
  productoId: productoId.required(),
  cantidad: cantidad.required(),
  precio: precio.required()

});
const substractItemSchema = joi.object({
  ventaId: ventaId.required(),
  productoId: productoId.required()
});
const queryVentaSchema = joi.object({
  limit,
  offset,
  fecha,
  confirmDeposito,
  confirmCobro: confirmCobro.when('confirm_deposito',{
    is: true,
    then: joi.required()
  }),
  cobros,
  items,
  cliente
});

module.exports = {
  createventaSchema,
  updateventaSchema,
  getventaSchema,
  addItemSchema,
  queryVentaSchema,
  substractItemSchema
  };
