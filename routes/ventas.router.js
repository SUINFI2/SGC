const express=require('express');
const router=express.Router();
const VentasService = require('../services/ventas.service');
const service = new VentasService();



module.exports=router;
