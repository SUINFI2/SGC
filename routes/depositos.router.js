const express=require('express');
const router=express.Router();
const DepositosService = require('../services/depositos.service');
const service = new DepositosService();
const  {
  createdepositoSchema,
  updatedepositoSchema,
  getdepositoSchema
  } = require('../schemas/deposito.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const depositos=await service.find(negocioId);
    res.json(depositos);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:depositoId',
validatorHandler(getdepositoSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,depositoId}=req.params;
  const deposito = await service.findOne(negocioId,depositoId);
  res.json(deposito);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createdepositoSchema,'body'),
async (req, res) => {
  const body = req.body;
  const Newdeposito = await service.create(body);
  res.json({
    message: 'created',
    data: Newdeposito
  });
});
router.patch('/:negocioId/:depositoId',
validatorHandler(getdepositoSchema,'params'),
validatorHandler(updatedepositoSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,depositoId } = req.params;
    const body = req.body;
    const xupdate = await service.update(negocioId,depositoId,body);
    res.json(xupdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:depositoId',
  validatorHandler(getdepositoSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,depositoId } = req.params;
  const delX = await service.delete(negocioId,depositoId);
  res.json(delX);
  }catch(err){
    next(err);
  }
});



module.exports=router;
