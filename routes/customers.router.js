const express=require('express');
const router=express.Router();
const CustumersService = require('../services/custumers.service');
const service = new CustumersService();
const  {
  createcustomerSchema,
  updatecustomerSchema,
  getcustomerSchema
  } = require('../schemas/customer.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const customers=await service.find(negocioId);
    res.json(customers);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:customerId',
validatorHandler(getcustomerSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,customerId}=req.params;
  const customer = await service.findOne(negocioId,customerId);
  res.json(customer);
  }catch(err){
    next(err);
  }
});
router.post('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
validatorHandler(createcustomerSchema,'body'),
async (req, res) => {
  const {negocioId} = req.params;
  const body = req.body;
  const Newcustomer = await service.create(negocioId,body);
  res.json({
    message: 'created',
    data: Newcustomer
  });
});
router.patch('/:negocioId/:customerId',
validatorHandler(getcustomerSchema,'params'),
validatorHandler(updatecustomerSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,customerId } = req.params;
    const body = req.body;
    const xupdate = await service.update(negocioId,customerId,body);
    res.json(xupdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:customerId',
  validatorHandler(getcustomerSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,customerId } = req.params;
  const delX = await service.delete(negocioId,customerId);
  res.json(delX);
  }catch(err){
    next(err);
  }
});



module.exports=router;
