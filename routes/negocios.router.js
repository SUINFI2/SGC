const express = require('express');
const {
  createnegocioSchema,
  updatenegocioSchema,
  getnegocioSchema,
} = require('../schemas/negocio.schema');

const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const negociosService = require('../services/negocios.service');
const service = new negociosService();
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const negocio = await service.find();
      res.json(negocio);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/',
  validatorHandler(getnegocioSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const negocio = await service.findOne(user.tenant);
      res.json(negocio);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  validatorHandler(createnegocioSchema, 'body'),
  async (req, res, next) => {
    try {
      const Newnegocio = await service.create(req.body);
      res.json(Newnegocio);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/',
  validatorHandler(getnegocioSchema, 'params'),
  validatorHandler(updatenegocioSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const negUpdate = await service.update(user.tenant, body);
      res.json(negUpdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/',
  validatorHandler(getnegocioSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const delNeg = await service.delete(user.tenant);
      res.json(delNeg);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
