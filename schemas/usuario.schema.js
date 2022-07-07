const joi = require('joi');
const id = joi.string();
const nombre = joi.string().min(3);
const precio =  joi.number().positive();
const createusuarioSchema = joi.object({
  negocioId: id.required(),
  customerId: id.required(),
  rubroId: id.required(),
  nameUsuario: joi.string().required(),
  passUser: joi.string().required()
});
const updateusuarioSchema = joi.object({
 //---
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
