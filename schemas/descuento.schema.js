const joi = require('joi');
const descuentoId = joi.number().positive();
const negocioId = joi.number().positive();
const nombre = joi.string().min(3);
const cntRequerida =  joi.number().positive();
const prcDescuento =  joi.number().positive();
const createdescuentoSchema = joi.object({
  negocioId: negocioId.required(),
  nombre: nombre.required(),
  cntRequerida : cntRequerida.required(),
  prcDescuento: prcDescuento.required()
});
const updatedescuentoSchema = joi.object({
  nombre,
  cntRequerida,
  prcDescuento
});
const getdescuentoSchema = joi.object({
  negocioId: negocioId.required(),
  descuentoId: descuentoId.required()
});

module.exports = {
  createdescuentoSchema,
  updatedescuentoSchema,
  getdescuentoSchema
  };
