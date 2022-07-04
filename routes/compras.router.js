const express=require('express');
const router=express.Router();
const ComprasService = require('../services/compras.service');
const service = new ComprasService();



module.exports=router;
