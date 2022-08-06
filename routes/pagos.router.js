const express = require('express');
const {
  createpagoSchema,
  updatepagoSchema,
  getpagoSchema,
} = require('../schemas/pago.schema');

const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const PagosService = require('../services/pagos.service');
const service = new PagosService();
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const pagos = await service.find(user.tenant);
      res.json(pagos);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  '/:pagoId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getpagoSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { pagoId } = req.params;
      const pago = await service.findOne(user.tenant, pagoId);
      res.json(pago);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(createpagoSchema, 'body'),
  async (req, res, next) => {
    try {
      const Newpago = await service.create(req.body);
      res.json(Newpago);
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  '/:pagoId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getpagoSchema, 'params'),
  validatorHandler(updatepagoSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { pagoId } = req.params;
      const body = req.body;
      const xupdate = await service.update(user.tenant, pagoId, body);
      res.json(xupdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:pagoId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getpagoSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  pagoId } = req.params;
      const delX = await service.delete(user.tenant, pagoId);
      res.json(delX);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
