const joi = require('joi');
const id = joi.number().integer();
const negocioId = joi.number().integer();
const nombre = joi.string();
const celular = joi.string();
const direccion = joi.string();
const email=joi.string().email();
const password=joi.string().min(8);
const role = joi.string().min(3);

const createusuarioSchema = joi.object({
  negocioId: negocioId.required(),
  nombre: nombre.required(),
  celular: celular.required(),
  direccion: direccion.required(),
  email:email.required(),
  password:password.required(),
  cuenta: joi.object({
    negocioId: negocioId.required(),
    nombre: nombre.required()
  })
  //role:role.required()
});
const updateusuarioSchema = joi.object({
 nombre,
 celular,
 direccion,
 email,
 password
 //role
});
const getusuarioSchema = joi.object({
  negocioId: id.required(),
  usuarioId: id.required()
});

module.exports = {
  createusuarioSchema,
  updateusuarioSchema,
  getusuarioSchema
  };



