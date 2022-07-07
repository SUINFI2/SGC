const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const precio =  joi.number().positive();
const createventaSchema = joi.object({
  negocioId: id.required(),
  depositoId: id.required(),
  clienteId: id.required(),
  usuarioId: id.required(),
  //compra-Productos
});
const updateventaSchema = joi.object({
 //--
});
const getventaSchema = joi.object({
  negocioId: id.required(),
  ventaId: id.required()
});

module.exports = {
  createventaSchema,
  updateventaSchema,
  getventaSchema
  };
