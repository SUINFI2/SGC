const express=require('express');
const router=express.Router();
const ClientesService = require('../services/clientes.service');
const service = new ClientesService();
const  {
  createclienteSchema,
  updateclienteSchema,
  getclienteSchema,
  queryClienteSchema
  } = require('../schemas/cliente.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const clientes=await service.find(negocioId);
    res.json(clientes);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:clienteId',
validatorHandler(queryClienteSchema, 'query'),
validatorHandler(getclienteSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,clienteId}=req.params;
  const cliente = await service.findOne(negocioId,clienteId,req.query);
  res.json(cliente);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createclienteSchema,'body'),
async (req, res,next) => {
  try{
    const Newcliente = await service.create(req.body);
    res.json(Newcliente);}catch(err){next(err);}
});
router.patch('/:negocioId/:clienteId',
validatorHandler(getclienteSchema,'params'),
validatorHandler(updateclienteSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,clienteId } = req.params;
    const body = req.body;
    const cliUpdate = await service.update(negocioId,clienteId,body);
    res.json(cliUpdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:clienteId',
  validatorHandler(getclienteSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,clienteId } = req.params;
  const delClie = await service.delete(negocioId,clienteId);
  res.json(delClie);
  }catch(err){
    next(err);
  }
});

module.exports=router;
