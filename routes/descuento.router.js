const express=require('express');
const router=express.Router();
const descuentosService = require('../services/descuentos.service');
const service = new descuentosService();
const  {
  createdescuentoSchema,
  updatedescuentoSchema,
  getdescuentoSchema
  } = require('../schemas/descuento.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const descuentos=await service.find(negocioId);
    res.json(descuentos);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:descuentoId',
validatorHandler(getdescuentoSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,descuentoId}=req.params;
  const descuento = await service.findOne(negocioId,descuentoId);
  res.json(descuento);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createdescuentoSchema,'body'),
async (req, res) => {
  const body = req.body;
  const Newdescuento = await service.create(body);
  res.json({
    message: 'created',
    data: Newdescuento
  });
});
router.patch('/:negocioId/:descuentoId',
validatorHandler(getdescuentoSchema,'params'),
validatorHandler(updatedescuentoSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,descuentoId } = req.params;
    const body = req.body;
    const xupdate = await service.update(negocioId,descuentoId,body);
    res.json(xupdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:descuentoId',
  validatorHandler(getdescuentoSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,descuentoId } = req.params;
  const delX = await service.delete(negocioId,descuentoId);
  res.json(delX);
  }catch(err){
    next(err);
  }
});



module.exports=router;
