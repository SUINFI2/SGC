const express=require('express');
const router=express.Router();
const ClientesService = require('../services/clientes.service');
const service = new ClientesService();



module.exports=router;
