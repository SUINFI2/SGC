const express=require('express');
const router=express.Router();
const CuentasService = require('../services/cuentas.service');
const service = new CuentasService();



module.exports=router;
