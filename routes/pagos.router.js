const express=require('express');
const router=express.Router();
const PagosService = require('../services/pagos.service');
const service = new PagosService();



module.exports=router;
