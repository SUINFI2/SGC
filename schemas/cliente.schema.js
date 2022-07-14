const joi = require('joi');
const id = joi.number().integer();
const negocioId = joi.number().integer();
const nombre = joi.string().min(3);
const celular = joi.string().min(3);
const direccion = joi.string().min(3);
const email = joi.string().min(3);
const createclienteSchema = joi.object({
  negocioId: negocioId.required(),
  nombre: nombre.required(),
  celular: celular.required(),
  direccion: direccion.required(),
  email: email.required(),
  cuenta: joi.object({
    negocioId: negocioId.required(),
    nombre: nombre.required()
  })
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
