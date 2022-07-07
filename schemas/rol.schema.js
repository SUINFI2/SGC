const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const createrolSchema = joi.object({
  nombre: nombre.required()
});
const updaterolSchema = joi.object({
  nombre
});
const getrolSchema = joi.object({
  rolId: id.required(),
});

module.exports = {
  createrolSchema,
  updaterolSchema,
  getrolSchema
  };
