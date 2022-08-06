const express = require('express');
const {
  createcompraSchema,
  updatecompraSchema,
  getcompraSchema,
  addItemSchema,
  queryCompraSchema,
  subractItemSchema,
  updateItemSchema,
} = require('../schemas/compra.schema');

const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler');
const ComprasService = require('../services/compras.service');
const service = new ComprasService();
const router = express.Router();

router.get(
  '/', passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(queryCompraSchema, 'query'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const compras = await service.find(user.tenant, req.query);
      res.json(compras);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  '/:compraId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(queryCompraSchema, 'query'),
  validatorHandler(getcompraSchema, 'params'),
  async (req, res, next) => {
    try {

      const user = req.user;
      const { compraId } = req.params;
      const compra = await service.findOne(user.tenant, compraId, req.query);
      res.json(compra);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createcompraSchema, 'body'),
  async (req, res, next) => {
    try {
      const Newcompra = await service.create(req.body);
      res.json(Newcompra);
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
      const xupdate = await service.updateItem(req.body);
      res.json(xupdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:compraId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getcompraSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  compraId } = req.params;
      const delX = await service.delete(user.tenant, compraId);
      res.json(delX);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
