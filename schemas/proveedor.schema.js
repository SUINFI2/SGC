const joi = require('joi');
const id = joi.number().integer();
const negocioId = joi.number().integer();
const nombre = joi.string().min(3);
const celular = joi.string().min(3);
const direccion = joi.string().min(3);
const email = joi.string().min(3);

const createproveedorSchema = joi.object({
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
const updateproveedorSchema = joi.object({
  nombre,
  celular,
  direccion,
  email
});
const getproveedorSchema = joi.object({
  negocioId: negocioId.required(),
  proveedorId: id.required()
});

module.exports = {
  createproveedorSchema,
  updateproveedorSchema,
  getproveedorSchema
  };
