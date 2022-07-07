const joi = require('joi');
const id = joi.string();

const importe =  joi.number().positive();
const createpagoSchema = joi.object({
  negocioId: id.required(),
  usuarioId: id.required(),
  clienteId: id.required(),
  cuentaId: id.required(),
  monto: importe.required()
});
const updatepagoSchema = joi.object({
  //--
});
const getpagoSchema = joi.object({
  negocioId: id.required(),
  pagoId: id.required()
});

module.exports = {
  createpagoSchema,
  updatepagoSchema,
  getpagoSchema
  };
