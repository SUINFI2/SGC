const express=require('express');
const router=express.Router();
const ImpresorasService = require('../services/impresoras.service');
const service = new ImpresorasService();
const  {
  createimpresoraSchema,
  updateimpresoraSchema,
  getimpresoraSchema
  } = require('../schemas/impresora.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const impresoras=await service.find(negocioId);
    res.json(impresoras);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:impresoraId',
validatorHandler(getimpresoraSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,impresoraId}=req.params;
  const impresora = await service.findOne(negocioId,impresoraId);
  res.json(impresora);
  }catch(err){
    next(err);
  }
});
router.post('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
validatorHandler(createimpresoraSchema,'body'),
async (req, res) => {
  const {negocioId} = req.params;
  const body = req.body;
  const Newimpresora = await service.create(negocioId,body);
  res.json({
    message: 'created',
    data: Newimpresora
  });
});
router.patch('/:negocioId/:impresoraId',
validatorHandler(getimpresoraSchema,'params'),
validatorHandler(updateimpresoraSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,impresoraId } = req.params;
    const body = req.body;
    const xupdate = await service.update(negocioId,impresoraId,body);
    res.json(xupdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:impresoraId',
  validatorHandler(getimpresoraSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,impresoraId } = req.params;
  const delX = await service.delete(negocioId,impresoraId);
  res.json(delX);
  }catch(err){
    next(err);
  }
});



module.exports=router;
