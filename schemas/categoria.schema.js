const joi = require('joi');
const id = joi.number().integer();
const negocioId = joi.number().integer();
const nombre = joi.string().min(3);
const productos = joi.bool();
const limit = joi.number().integer();
const offset = joi.number().integer();
const createcategoriaSchema = joi.object({
  negocioId: negocioId.required(),
  nombre: nombre.required()
});
const updatecategoriaSchema = joi.object({
  nombre
});
const getcategoriaSchema = joi.object({

  negocioId: negocioId.required(),
  id: id.required()
});
const queryCategoriaSchema = joi.object({
  limit,
  offset,
  productos
});

module.exports = {
  createcategoriaSchema,
  updatecategoriaSchema,
  getcategoriaSchema,
  queryCategoriaSchema
  };
