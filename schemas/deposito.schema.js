const joi = require('joi');
const depositoId = joi.number().integer();
const negocioId = joi.number().integer();
const productoId = joi.number().integer();
const cantidad = joi.number().positive();
const nombre = joi.string().min(3);
const direccion = joi.string().min(3);

const createdepositoSchema = joi.object({
  negocioId: negocioId.required(),
  nombre: nombre.required(),
  direccion: direccion.required()
});
const updatedepositoSchema = joi.object({
  nombre,
  direccion,
});
const getdepositoSchema = joi.object({
  negocioId: negocioId.required(),
  depositoId: depositoId.required()
});

const addItemSchema = joi.object({
  depositoId: depositoId.required(),
  productoId: productoId.required(),
  cantidad: cantidad.required()

});
const subractItemSchema = joi.object({
  depositoId: depositoId.required(),
  productoId: productoId.required(),
  //cantidad: cantidad.required()

});
module.exports = {
  createdepositoSchema,
  updatedepositoSchema,
  getdepositoSchema,
  addItemSchema,
  subractItemSchema
  };
