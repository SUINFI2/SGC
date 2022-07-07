const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const createnegocioSchema = joi.object({
  nombre: nombre.required()
});
const updatenegocioSchema = joi.object({
  nombre,
});
const getnegocioSchema = joi.object({
  negocioId: id.required()
});
module.exports ={
  createnegocioSchema,
  updatenegocioSchema,
  getnegocioSchema};
