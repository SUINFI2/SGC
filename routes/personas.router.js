const express=require('express');
const router=express.Router();
const PersonasService = require('../services/personas.service');
const service = new PersonasService();



module.exports=router;
