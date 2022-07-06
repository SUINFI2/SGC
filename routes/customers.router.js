const express=require('express');
const router=express.Router();
const CustumersService = require('../services/custumers.service');
const service = new CustumersService();



module.exports=router;
