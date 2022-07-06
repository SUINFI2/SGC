const express=require('express');
const router=express.Router();
const DepositosService = require('../services/depositos.service');
const service = new DepositosService();



module.exports=router;
