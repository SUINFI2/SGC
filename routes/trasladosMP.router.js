const express=require('express');
const router=express.Router();
const TrasladosMPService = require('../services/trasladosMP.service');
const service = new TrasladosMPService();



module.exports=router;
