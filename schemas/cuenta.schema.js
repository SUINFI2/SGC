const joi = require('joi');
const negocioId = joi.number().integer();
const nombre = joi.string().min(3);
const debe =  joi.number().positive();
const haber =  joi.number().positive();

const createcuentaSchema = joi.object({
  negocioId: negocioId.required(),
  nombre: nombre.required()
});
const updatecuentaSchema = joi.object({
  nombre,
  debe,
  haber
});
const getcuentaSchema = joi.object({
  negocionegocioId: negocioId.required(),
  cuentanegocioId: negocioId.required()
});

module.exports = {
  createcuentaSchema,
  updatecuentaSchema,
  getcuentaSchema
  };
