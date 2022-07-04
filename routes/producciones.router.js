const express=require('express');
const router=express.Router();
const ProduccionesService = require('../services/producciones.service');
const service = new ProduccionesService();



module.exports=router;
