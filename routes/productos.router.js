const express = require('express');
const {
  createproductoSchema,
  updateproductoSchema,
  getproductoSchema,
  queryProductoSchema,
} = require('../schemas/producto.schema');

const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const productosService = require('../services/productos.service');
const service = new productosService();
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(queryProductoSchema, 'query'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const products = await service.find(user.tenant, req.query);
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  '/:productoId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getproductoSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  productoId } = req.params;
      const producto = await service.findOne(user.tenant, productoId);
      res.json(producto);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(createproductoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const Newproducto = await service.create(body);
      res.json({
        message: 'created',
        data: Newproducto,
      });
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  '/:productoId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getproductoSchema, 'params'),
  validatorHandler(updateproductoSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  productoId } = req.params;
      const body = req.body;
      const prodUpdate = await service.update(user.tenant, productoId, body);
      res.json(prodUpdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:productoId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getproductoSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  productoId } = req.params;
      const delProd = await service.delete(user.tenant, productoId);
      res.json(delProd);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
