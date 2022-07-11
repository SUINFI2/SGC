const joi = require('joi');
const id = joi.number().integer();
const email=joi.string().email();
const password=joi.string().min(8);
const role = joi.string().min(3);
const createusuarioSchema = joi.object({
  email:email.required(),
  password:password.required(),
  role:role.required()
});
const updateusuarioSchema = joi.object({
  email:email,
  role
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



