const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const precio =  joi.number().positive();
const cantidad =  joi.number().positive();
const createdescuentoSchema = joi.object({
  negocioId: id.required(),
  nombre: nombre.required(),
  cantidad : cantidad.required(),
  precio: precio.required()
});
const updatedescuentoSchema = joi.object({
  nombre,
  cantidad,
  precio
});
const getdescuentoSchema = joi.object({
  negocioId: id.required(),
  descuentoId: id.required()
});

module.exports = {
  createdescuentoSchema,
  updatedescuentoSchema,
  getdescuentoSchema
  };
