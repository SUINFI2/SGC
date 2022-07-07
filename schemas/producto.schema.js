const joi = require('joi');
const id = joi.string();
const codBarra = joi.string();
const nombre = joi.string().min(3);
const costo =  joi.number().positive();
const cantidad =  joi.number().positive();
const margen =  joi.number().positive();
const createproductoSchema = joi.object({
  negocioId: id.required(),
  codBarra: codBarra.required(),
  nombre: nombre.required(),
  costo: costo.required(),
  cantidad: cantidad.required(),
  margen: margen.required(),
  catogoriaId: id.required()
});
const updateproductoSchema = joi.object({
 codBarra,
 nombre,
 costo,
 cantidad,
 margen
});
const getproductoSchema = joi.object({
  negocioId: id.required(),
  productoId: id.required()
});

module.exports = {
  createproductoSchema,
  updateproductoSchema,
  getproductoSchema
  };
