const express = require('express');

const {
  createproveedorSchema,
  updateproveedorSchema,
  getproveedorSchema,
  queryProveedorSchema,
} = require('../schemas/proveedor.schema');

const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const ProveedoresService = require('../services/proveedores.service');
const service = new ProveedoresService();
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const proveedors = await service.find(user.tenant);
      res.json(proveedors);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  '/:proveedorId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(queryProveedorSchema, 'query'),
  validatorHandler(getproveedorSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  proveedorId } = req.params;
      const proveedor = await service.findOne(
        user.tenant,
        proveedorId,
        req.query
      );
      res.json(proveedor);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(createproveedorSchema, 'body'),
  async (req, res, next) => {
    try {
      const Newproveedor = await service.create(req.body);
      res.json(Newproveedor);
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  '/:proveedorId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getproveedorSchema, 'params'),
  validatorHandler(updateproveedorSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { proveedorId } = req.params;
      const xupdate = await service.update(user.tenant, proveedorId, req.body);
      res.json(xupdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:proveedorId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getproveedorSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { proveedorId } = req.params;
      const delX = await service.delete(user.tenant, proveedorId);
      res.json(delX);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
