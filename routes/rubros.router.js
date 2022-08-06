const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const {checkRoles}=require('../middlewares/auth.handler');

const RubrosService = require('../services/rubros.service');
const service = new RubrosService();
const router = express.Router();

router.get('/',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
async (req, res, next) => {
  try {
    const rubros = await service.find(req.query);
    res.json(rubros);
  } catch (err) {
    next(err);
  }
});

router.post('/generate',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
async (req, res, next) => {
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
