const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const createclienteSchema = joi.object({
  negocioId: id.required(),
  nombre: nombre.required(),
  // customerId:
});
const updateclienteSchema = joi.object({
  nombre
});
const getclienteSchema = joi.object({
  negocioId: id.required(),
  clienteId: id.required()
});

module.exports = {
  createclienteSchema,
  updateclienteSchema,
  getclienteSchema
  };
