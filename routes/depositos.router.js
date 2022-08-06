const express = require('express');

const {
  createdepositoSchema,
  updatedepositoSchema,
  getdepositoSchema,
  addItemSchema,
  subractItemSchema,
  getItemSchema,
  updateItemSchema,
  confirmPutDeposito,
  confirmOutDeposito,
} = require('../schemas/deposito.schema');

const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const DepositosService = require('../services/depositos.service');
const service = new DepositosService();
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const depositos = await service.find(user.tenant);
      res.json(depositos);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  '/:depositoId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getdepositoSchema, 'params'),
  async (req, res, next) => {
    try {

      const user = req.user;
      const { depositoId } = req.params;
      const deposito = await service.findOne(user.tenant, depositoId);
      res.json(deposito);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createdepositoSchema, 'body'),
  async (req, res, next) => {
    try {
      const Newdeposito = await service.create(req.body);
      res.json(Newdeposito);
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  '/:depositoId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getdepositoSchema, 'params'),
  validatorHandler(updatedepositoSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  depositoId } = req.params;
      const body = req.body;
      const xupdate = await service.update(user.tenant, depositoId, body);
      res.json(xupdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:depositoId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getdepositoSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  depositoId } = req.params;
      const delX = await service.delete(user.tenant, depositoId);
      res.json(delX);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/add-item',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const Newcompra = await service.addItem(req.body);
      res.json(Newcompra);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/subtract-item',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(subractItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const Newcompra = await service.subtractItems(req.body);
      res.json(Newcompra);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/update-item',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(updateItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const Newcompra = await service.updateItem(req.body);
      res.json(Newcompra);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/confirmPutDeposito',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(confirmPutDeposito, 'body'),
  async (req, res) => {
    const body = req.body;
    const Newcompra = await service.confirmPutDeposito(body);
    res.json({
      message: 'updated',
      data: Newcompra,
    });
  }
);

router.patch(
  '/confirmOutDeposito',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(confirmOutDeposito, 'body'),
  async (req, res) => {
    const body = req.body;
    const Newcompra = await service.confirmOutDeposito(body);
    res.json({
      message: 'updated',
      data: Newcompra,
    });
  }
);
module.exports = router;
