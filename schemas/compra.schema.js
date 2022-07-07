const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const fecha =  joi.date();
const createcompraSchema = joi.object({
  negocioId: id.required(),
  depositoId: id.required(),
  proveedorId: id.required(),
  usuarioId: id.required(),
  //compra-Productos
  fechaRecepcion: fecha.required()
});
const updatecompraSchema = joi.object({
  nombre: fecha,
});
const getcompraSchema = joi.object({
  negocioId: id.required(),
  compraId: id.required()
});

module.exports = {
  createcompraSchema,
  updatecompraSchema,
  getcompraSchema
  };
