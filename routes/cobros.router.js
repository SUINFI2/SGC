const express = require('express');
const {
  createcobroSchema,
  updatecobroSchema,
  getcobroSchema,
} = require('../schemas/cobro.schema');

const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const CobrosService = require('../services/cobros.service');
const service = new CobrosService();
const router = express.Router();
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const cobros = await service.find(user.tenant);
      res.json(cobros);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  '/:cobroId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getcobroSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { cobroId } = req.params;
      const cobro = await service.findOne(user.tenant, cobroId);
      res.json(cobro);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createcobroSchema, 'body'),
  async (req, res, next) => {
    try {
      const Newcobro = await service.create(req.body);
      res.json(Newcobro);
    } catch (err) {
      next(err);
    }
  }
);
router.delete(
  '/:cobroId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getcobroSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {cobroId } = req.params;
      const delCobro = await service.delete(user.tenant, cobroId);
      res.json(delCobro);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
