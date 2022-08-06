const express = require('express');
const passport = require('passport');
const { checkRoles}=require('../middlewares/auth.handler');
const VentasService = require('../services/ventas.service');
const service = new VentasService();
const router = express.Router();
router.get(
  '/MisVentas',
  passport.authenticate('jwt', { session: false }),
checkRoles('seller','admin'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const ventas = await service.findByUser(user.sub);
      res.json(ventas);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
