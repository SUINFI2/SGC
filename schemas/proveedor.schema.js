const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const precio =  joi.number().positive();
const createpreoveedorSchema = joi.object({
  negocioId: id.required(),
  nombre: nombre.required()
});
const updatepreoveedorSchema = joi.object({
  nombre
});
const getpreoveedorSchema = joi.object({
  negocioId: id.required(),
  preoveedorId: id.required()
});

module.exports = {
  createpreoveedorSchema,
  updatepreoveedorSchema,
  getpreoveedorSchema
  };
