const joi = require('joi');
const id = joi.number().integer();
const negocioId = joi.number().integer();
const nombre = joi.string().min(3);
const celular = joi.string().min(3);
const direccion = joi.string().min(3);
const email = joi.string().min(3);
const imagen = joi.string().uri();
const ventas =  joi.bool();

const limit = joi.number().integer();
const offset = joi.number().integer();
const createclienteSchema = joi.object({
  negocioId: negocioId.required(),
  nombre: nombre.required(),
  celular: celular.required(),
  direccion: direccion.required(),
  email: email.required(),
  imagen: imagen
});
const updateclienteSchema = joi.object({
  nombre,
  celular,
  imagen,
  direccion,
  email

});
const getclienteSchema = joi.object({
  negocioId: id.required(),
  clienteId: id.required()
});
const queryClienteSchema = joi.object({
  limit,
  offset,
  ventas,
});

module.exports = {
  createclienteSchema,
  updateclienteSchema,
  getclienteSchema,
  queryClienteSchema
  };
