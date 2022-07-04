const express=require('express');
const router=express.Router();
const GastosService = require('../services/gastos.service');
const service = new GastosService();



module.exports=router;
