const express=require('express');
const router=express.Router();
const RolesService = require('../services/roles.service');
const service = new RolesService();



module.exports=router;
