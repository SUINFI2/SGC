const express = require('express');
const router = express.Router();
const RubrosService = require('../services/rubros.service');
const service = new RubrosService();
const {getnegocioSchema} = require('../schemas/negocio.schema');
const validatorHandler = require('../middlewares/validator.handler');

router.get('/',
validatorHandler(getnegocioSchema,'query'),
async (req, res, next) => {
  try {
    const rubros = await service.find(req.query);
    res.json(rubros);
  } catch (err) {
    next(err);
  }
});

router.post('/generate', async (req, res, next) => {
  try {
    const rubros = await service.generate();
    res.json({
      message: 'created',
      data: rubros,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
