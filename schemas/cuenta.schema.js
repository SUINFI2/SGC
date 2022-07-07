const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const debe =  joi.number().positive();
const haber =  joi.number().positive();

const createcuentaSchema = joi.object({
  negocioId: id.required(),
  nombre: nombre.required()
});
const updatecuentaSchema = joi.object({
  nombre,
  debe,
  haber
});
const getcuentaSchema = joi.object({
  negocioId: id.required(),
  cuentaId: id.required()
});

module.exports = {
  createcuentaSchema,
  updatecuentaSchema,
  getcuentaSchema
  };
