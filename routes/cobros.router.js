const express=require('express');
const router=express.Router();
const CobrosService = require('../services/cobros.service');
const service = new CobrosService();



module.exports=router;
