const joi = require('joi');
const id = joi.number().integer();
const categoriaId = joi.number().integer();
//const codBarra = joi.string();
const nombre = joi.string().min(3);
const codigo = joi.string().min(3);
const costo =  joi.number().positive();
const costo_min =  joi.number().positive();
const costo_max =  joi.number().positive();
const descripcion = joi.string();
const imagen = joi.string().uri();
//const cantidad =  joi.number().positive();
const margen =  joi.number().positive();

const limit = joi.number().integer();
const offset = joi.number().integer();
const createproductoSchema = joi.object({
  categoriaId: id.required(),
  negocioId: categoriaId.required(),
codigo: codigo,
  nombre: nombre.required(),
  imagen: imagen.required(),
  descripcion: descripcion.required(),
  costo: costo.required(),
  margen: margen.required(),

});
const updateproductoSchema = joi.object({
 imagen,
 nombre,
 costo,
 codigo,
 descripcion,
 margen
});
const getproductoSchema = joi.object({
  productoId: id.required()
});
const queryProductoSchema = joi.object({
  limit,
  offset,
  costo,
  costo_min,
  costo_max: costo_max.when('costo_min',{
    is: joi.number().positive(),
   then: costo_max
  })
});

module.exports = {
  createproductoSchema,
  updateproductoSchema,
  getproductoSchema,
  queryProductoSchema
  };
