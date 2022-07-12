const joi = require('joi');
const id = joi.number().integer();
const categoriaId = joi.number().integer();
//const codBarra = joi.string();
const nombre = joi.string().min(3);
const costo =  joi.number().positive();
const descripcion = joi.string();
const imagen = joi.string().uri();
//const cantidad =  joi.number().positive();
const margen =  joi.number().positive();

const createproductoSchema = joi.object({
  categoriaId: id.required(),
  negocioId: categoriaId.required(),
 // codBarra: codBarra.required(),
  nombre: nombre.required(),
  imagen: imagen.required(),
  descripcion: descripcion.required(),
  costo: costo.required(),
  //cantidad: cantidad.required(),
  margen: margen.required(),

});
const updateproductoSchema = joi.object({
 imagen,
 nombre,
 costo,
 descripcion,
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
