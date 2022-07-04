const express=require('express');
const router=express.Router();
const ImpresorasService = require('../services/impresoras.service');
const service = new ImpresorasService();



module.exports=router;
