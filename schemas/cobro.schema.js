const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const importe =  joi.number().positive();
const createcobroSchema = joi.object({
  negocioId: id.required(),
  usuarioId: id.required(),
  clienteId: id.required(),
  cuentaId: id.required(),
  monto: importe.required()
});
const updatecobroSchema = joi.object({
  id,
});
const getcobroSchema = joi.object({
  negocioId: id.required(),
  cobroId: id.required()
});

module.exports = {
  createcobroSchema,
  updatecobroSchema,
  getcobroSchema
  };
