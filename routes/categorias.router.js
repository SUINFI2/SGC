const express=require('express');
const router=express.Router();
const CategoriasService = require('../services/categorias.service');
const service = new CategoriasService();



module.exports=router;
