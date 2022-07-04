const express=require('express');
const router=express.Router();
const UsuariosService = require('../services/usuarios.service');
const service = new UsuariosService();



module.exports=router;
