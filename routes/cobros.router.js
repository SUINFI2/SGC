const express=require('express');
const router=express.Router();
const CobrosService = require('../services/cobros.service');
const service = new CobrosService();
const  {
  createcobroSchema,
  updatecobroSchema,
  getcobroSchema
  } = require('../schemas/cobro.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const cobros=await service.find(negocioId);
    res.json(cobros);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:cobroId',
validatorHandler(getcobroSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,cobroId}=req.params;
  const cobro = await service.findOne(negocioId,cobroId);
  res.json(cobro);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createcobroSchema,'body'),
async (req, res) => {
  const body = req.body;
  const Newcobro = await service.create(body);
  res.json({
    message: 'created',
    data: Newcobro
  });
});
router.patch('/:negocioId/:cobroId',
validatorHandler(getcobroSchema,'params'),
validatorHandler(updatecobroSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,cobroId } = req.params;
    const body = req.body;
    const cobUpdate = await service.update(negocioId,cobroId,body);
    res.json(cobUpdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:cobroId',
  validatorHandler(getcobroSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,cobroId } = req.params;
  const delCobro = await service.delete(negocioId,cobroId);
  res.json(delCobro);
  }catch(err){
    next(err);
  }
});


module.exports=router;
