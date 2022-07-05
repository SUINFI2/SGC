const joi = require('joi');

const id = joi.string().uuid();
const nombre = joi.string().min(3);
const precio =  joi.number().positive();


const createProductoSchema = joi.object({

  nombre: nombre.required(),
  precio: precio.required()

});

const updateProductoSchema = joi.object({
  nombre,
  precio,
});

const getProductoSchema = joi.object({
  id: id.required()
});


module.exports = {

  createProductoSchema,
  updateProductoSchema,
  getProductoSchema

  };
