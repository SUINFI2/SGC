const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const celular = joi.string().min(3);
const direccion = joi.string().min(3);
const email = joi.string().min(3);
const createclienteSchema = joi.object({
  negocioId: id.required(),
  nombre: nombre.required(),
  celular: celular.required(),
  direccion: direccion.required(),
  email: email.required()
});
const updateclienteSchema = joi.object({
  nombre,
  celular,
  direccion,
  email
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
