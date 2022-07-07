const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const direccion = joi.string().min(3);
const precio =  joi.number().positive();
const createdepositoSchema = joi.object({
  negocioId: id.required(),
  nombre: nombre.required(),
  direccion: direccion.required()
});
const updatedepositoSchema = joi.object({
  nombre,
  direccion,
});
const getdepositoSchema = joi.object({
  negocioId: id.required(),
  depositoId: id.required()
});

module.exports = {
  createdepositoSchema,
  updatedepositoSchema,
  getdepositoSchema
  };
