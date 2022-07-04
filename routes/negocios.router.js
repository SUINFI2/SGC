const express=require('express');
const router=express.Router();
const NegociosService = require('../services/negocios.service');
const service = new NegociosService();



module.exports=router;
