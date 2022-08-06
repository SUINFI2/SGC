const express = require('express');
const {
  createcuentaSchema,
  updatecuentaSchema,
  getcuentaSchema,
} = require('../schemas/cuenta.schema');

const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const {checkRoles}=require('../middlewares/auth.handler');

const CuentasService = require('../services/cuentas.service');

const service = new CuentasService();
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const cuentas = await service.find(user.tenant);
      res.json(cuentas);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  '/:cuentaId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getcuentaSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  cuentaId } = req.params;
      const cuenta = await service.findOne(user.tenant, cuentaId);
      res.json(cuenta);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createcuentaSchema, 'body'),
  async (req, res, next) => {
    try {
      const Newcuenta = await service.create(req.body);
      res.json(Newcuenta);
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  '/:cuentaId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getcuentaSchema, 'params'),
  validatorHandler(updatecuentaSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  cuentaId } = req.params;
      const xupdate = await service.update(user.tenant, cuentaId, req.body);
      res.json(xupdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:cuentaId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getcuentaSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  cuentaId } = req.params;
      const delX = await service.delete(user.tenant, cuentaId);
      res.json(delX);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
