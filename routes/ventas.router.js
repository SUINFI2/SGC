const express = require('express');
const {
  createventaSchema,
  updateventaSchema,
  getventaSchema,
  addItemSchema,
  queryVentaSchema,
  substractItemSchema,
} = require('../schemas/venta.schema');

const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const VentasService = require('../services/ventas.service');
const service = new VentasService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(queryVentaSchema, 'query'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const ventas = await service.find(user.tenant, req.query);
      res.json(ventas);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  '/:ventaId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(queryVentaSchema, 'query'),
  validatorHandler(getventaSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { ventaId } = req.params;
      const venta = await service.findOne(user.tenant, ventaId, req.query);
      res.json(venta);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(createventaSchema, 'body'),
  async (req, res, next) => {
    try {
      const Newventa = await service.create(req.body);
      res.json(Newventa);
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

router.patch(
  '/:ventaId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getventaSchema, 'params'),
  validatorHandler(updateventaSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  ventaId } = req.params;
      const body = req.body;
      const xupdate = await service.update(user.tenant, ventaId, body);
      res.json(xupdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:ventaId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getventaSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  ventaId } = req.params;
      const delX = await service.delete(user.tenant, ventaId);
      res.json(delX);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/subtract-item',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(substractItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const delItem = await service.subtractItems(req.body);
      res.json(delItem);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
