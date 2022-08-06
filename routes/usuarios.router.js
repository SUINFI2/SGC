const express = require('express');

const {
  createusuarioSchema,
  updateusuarioSchema,
  getusuarioSchema,
} = require('../schemas/usuario.schema');


const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const {checkRoles}=require('../middlewares/auth.handler');

const UsuariosService = require('../services/usuarios.service');
const service = new UsuariosService();
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const usuarios = await service.find(user.tenant);
      res.json(usuarios);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  '//:usuarioId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getusuarioSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const {  usuarioId } = req.params;
      const usuario = await service.findOne(user.tenant, usuarioId, req.query);
      res.json(usuario);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(createusuarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const Newusuario = await service.create(req.body);
      res.json(Newusuario);
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  '/:usuarioId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getusuarioSchema, 'params'),
  validatorHandler(updateusuarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { usuarioId } = req.params;
      const body = req.body;
      const xupdate = await service.update(user.tenant, usuarioId, body);
      res.json(xupdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:usuarioId',
  passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getusuarioSchema, 'params'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { usuarioId } = req.params;
      const delX = await service.delete(user.tenant, usuarioId);
      res.json(delX);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
