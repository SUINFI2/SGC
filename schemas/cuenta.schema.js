const joi = require('joi');
const negocioId = joi.number().integer();
const rubroId = joi.number().integer();
const nombre = joi.string().min(3);
const debe =  joi.number();
const haber =  joi.number();

const createcuentaSchema = joi.object({
  negocioId: negocioId.required(),
  rubroId:rubroId.required(),
  nombre: nombre.required()
});
const updatecuentaSchema = joi.object({
  nombre,
  debe,
  haber
});
const getcuentaSchema = joi.object({
  cuentaId: negocioId.required()
});

module.exports = {
  createcuentaSchema,
  updatecuentaSchema,
  getcuentaSchema
  };
