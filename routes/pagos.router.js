const express=require('express');
const router=express.Router();
const PagosService = require('../services/pagos.service');
const service = new PagosService();
const  {
  createpagoSchema,
  updatepagoSchema,
  getpagoSchema
  } = require('../schemas/pago.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const pagos=await service.find(negocioId);
    res.json(pagos);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:pagoId',
validatorHandler(getpagoSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,pagoId}=req.params;
  const pago = await service.findOne(negocioId,pagoId);
  res.json(pago);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createpagoSchema,'body'),
async (req, res,next) => {
  try{const Newpago = await service.create(req.body);
    res.json(Newpago);}catch(err){next(err);}
});
router.patch('/:negocioId/:pagoId',
validatorHandler(getpagoSchema,'params'),
validatorHandler(updatepagoSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,pagoId } = req.params;
    const body = req.body;
    const xupdate = await service.update(negocioId,pagoId,body);
    res.json(xupdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:pagoId',
  validatorHandler(getpagoSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,pagoId } = req.params;
  const delX = await service.delete(negocioId,pagoId);
  res.json(delX);
  }catch(err){
    next(err);
  }
});



module.exports=router;
