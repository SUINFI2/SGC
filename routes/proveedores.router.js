const express=require('express');
const router=express.Router();
const ProveedoresService = require('../services/proveedores.service');
const service = new ProveedoresService();



module.exports=router;
