const express=require('express');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const {checkRoles}=require('../middlewares/auth.handler');
const  {
  createclienteSchema,
  updateclienteSchema,
  getclienteSchema,
  queryClienteSchema
  } = require('../schemas/cliente.schema');
const ClientesService = require('../services/clientes.service');

  const service = new ClientesService();
  const router=express.Router();

  router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin','seller'),
  async (req,res,next)=>{
  try{
    const user = req.user;
    const clientes=await service.find(user.tenant);
    res.json(clientes);
  }catch(err){
    next(err);
  }
});

router.get('/:clienteId',
passport.authenticate('jwt', { session: false }),
checkRoles('admin','seller'),
validatorHandler(queryClienteSchema, 'query'),
validatorHandler(getclienteSchema, 'params'),
async (req,res,next)=>{
  try{
    const user = req.user;
    const{clienteId}=req.params;
  const cliente = await service.findOne(user.tenant,clienteId,req.query);
  res.json(cliente);
  }catch(err){
    next(err);
  }
});

router.post('/',
passport.authenticate('jwt', { session: false }),
checkRoles('admin','seller'),
validatorHandler(createclienteSchema,'body'),
async (req, res,next) => {
  try{
    const Newcliente = await service.create(req.body);
    res.json(Newcliente);}catch(err){next(err);}
});
router.patch('/:clienteId',
passport.authenticate('jwt', { session: false }),
checkRoles('admin','seller'),
validatorHandler(getclienteSchema,'params'),
validatorHandler(updateclienteSchema,'body'),
async (req, res,next) => {
  try{
    const user = req.user;
    const { clienteId } = req.params;
    const body = req.body;
    const cliUpdate = await service.update(user.tenant,clienteId,body);
    res.json(cliUpdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:clienteId',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getclienteSchema,'params'),
  async(req, res,next) => {
  try{
    const user = req.user;
    const { clienteId } = req.params;
  const delClie = await service.delete(user.tenant,clienteId);
  res.json(delClie);
  }catch(err){
    next(err);
  }
});

module.exports=router;
