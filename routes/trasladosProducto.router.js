const express=require('express');
const router=express.Router();
const TrasladosProductoService = require('../services/trasladosProducto.service');
const service = new TrasladosProductoService();



module.exports=router;
