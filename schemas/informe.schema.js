const joi = require('joi');

const fecha_min = joi.date();
const fecha_max = joi.date();

const queryInformeSchema = joi.object({
  fecha_min,
  fecha_max: fecha_max.when('fecha_min',{
    is: joi.date(),
    then: joi.required()
  })
});

module.exports = { queryInformeSchema };
