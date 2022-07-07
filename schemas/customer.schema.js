const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const apellido = joi.string().min(3);
const email = joi.string().min(3);
const tel = joi.string().min(3);
const direccion = joi.string().min(3);

const createcustomerSchema = joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  tel: tel.required(),
  direccion: direccion.required()
});
const updatecustomerSchema = joi.object({
  nombre,
  apellido,
  email,
  tel,
  direccion
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
