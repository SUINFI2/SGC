const joi = require('joi');
const id = joi.string();
const userId = joi.string();
const nombre = joi.string().min(3);
const apellido = joi.string().min(3);
const email = joi.string().min(3);
const celular = joi.string().min(3);
const direccion = joi.string().min(3);
const password = joi.string();

const createcustomerSchema = joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  celular: celular.required(),
  direccion: direccion.required(),
  usuario: joi.object({
    email: email.required(),
    password: password.required()
  })
});
const updatecustomerSchema = joi.object({
  nombre,
  apellido,
  celular,
  direccion,
  userId
});
const getcustomerSchema = joi.object({
  negocioId: id.required(),
  customerId: id.required()
});

module.exports = {
  createcustomerSchema,
  updatecustomerSchema,
  getcustomerSchema
  };
