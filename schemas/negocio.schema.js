const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const celular = joi.string().min(3);
const direccion = joi.string().min(3);
const createnegocioSchema = joi.object({
  nombre: nombre.required(),
  celular: celular.required(),
  direccion: direccion.required()
});
const updatenegocioSchema = joi.object({
  nombre,
  celular,
  direccion

});
const getnegocioSchema = joi.object({
  negocioId: id.required()
});
module.exports ={
  createnegocioSchema,
  updatenegocioSchema,
  getnegocioSchema};
