const joi = require('joi');
const pagoId = joi.number().positive();
const negocioId = joi.number().positive();
const proveedorId = joi.number().positive();
const monto = joi.number().positive();
const cuentaId = joi.number().positive();

const createpagoSchema = joi.object({
  negocioId: negocioId.required(),
  proveedorId: proveedorId.required(),
  cuentaId: cuentaId.required(),
  monto: monto.required()
});
const updatepagoSchema = joi.object({
  proveedorId,
  cuentaId,
  monto
});
const getpagoSchema = joi.object({
  negocioId: negocioId.required(),
  pagoId: pagoId.required()
});

module.exports = {
  createpagoSchema,
  updatepagoSchema,
  getpagoSchema
  };
