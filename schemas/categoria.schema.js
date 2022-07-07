const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);

const createcategoriaSchema = joi.object({
  negocioId: id.required(),
  nombre: nombre.required()
});
const updatecategoriaSchema = joi.object({
  nombre
});
const getcategoriaSchema = joi.object({
  negocioId: id.required(),
  categoriaId: id.required()
});

module.exports = {
  createcategoriaSchema,
  updatecategoriaSchema,
  getcategoriaSchema
  };
