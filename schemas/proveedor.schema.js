const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const celular = joi.string().min(3);
const direccion = joi.string().min(3);
const email = joi.string().min(3);
const createproveedorSchema = joi.object({
  negocioId: id.required(),
  nombre: nombre.required(),
  celular: celular.required(),
  direccion: direccion.required(),
  email: email.required()
});
const updateproveedorSchema = joi.object({
  nombre,
  celular,
  direccion,
  email
});
const getproveedorSchema = joi.object({
  negocioId: id.required(),
  proveedorId: id.required()
});

module.exports = {
  createproveedorSchema,
  updateproveedorSchema,
  getproveedorSchema
  };
