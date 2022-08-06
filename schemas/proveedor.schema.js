const joi = require('joi');
const id = joi.number().integer();
const negocioId = joi.number().integer();
const nombre = joi.string().min(3);
const celular = joi.string().min(3);
const direccion = joi.string().min(3);
const email = joi.string().min(3);
const compras =  joi.bool();

const limit = joi.number().integer();
const offset = joi.number().integer();

const createproveedorSchema = joi.object({
  negocioId: negocioId.required(),
  nombre: nombre.required(),
  celular: celular.required(),
  direccion: direccion.required(),
  email: email.required(),

});
const updateproveedorSchema = joi.object({
  nombre,
  celular,
  direccion,
  email
});
const getproveedorSchema = joi.object({
  proveedorId: id.required()
});
const queryProveedorSchema = joi.object({
  limit,
  offset,
  compras,
});

module.exports = {
  createproveedorSchema,
  updateproveedorSchema,
  getproveedorSchema,
  queryProveedorSchema
  };
