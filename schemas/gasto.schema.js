const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const importe =  joi.number().positive();
const creategastoSchema = joi.object({
  negocioId: id.required(),
  usuarioId_E: id.required(),
  usuarioId_R: id.required(),
  cuentaId: id.required(),
  monto: importe.required()
});
const updategastoSchema = joi.object({
//--
});
const getgastoSchema = joi.object({
  negocioId: id.required(),
  gastoId: id.required()
});

module.exports = {
  creategastoSchema,
  updategastoSchema,
  getgastoSchema
  };
