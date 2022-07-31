const express=require('express');
const router=express.Router();
const ComprasService = require('../services/compras.service');
const service = new ComprasService();
const  {
  createcompraSchema,
  updatecompraSchema,
  getcompraSchema,
  addItemSchema,
  queryCompraSchema,
  subractItemSchema,
  updateItemSchema
  } = require('../schemas/compra.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');

  router.get('/:negocioId',
  validatorHandler(queryCompraSchema,'query'),
  validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const compras=await service.find(negocioId,req.query);
    res.json(compras);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:compraId',
validatorHandler(queryCompraSchema,'query'),
validatorHandler(getcompraSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,compraId}=req.params;
  const compra = await service.findOne(negocioId,compraId,req.query);
  res.json(compra);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createcompraSchema,'body'),
async (req, res,next) => {
  try{
    const Newcompra = await service.create(req.body);
    res.json(Newcompra);}catch(err){ next(err);}
});

router.post('/add-item',
validatorHandler(addItemSchema,'body'),
async (req, res,next) => {
 try{ const Newcompra = await service.addItem(req.body);
  res.json(Newcompra);}catch(err){next(err);}
});

router.delete('/subtract-item',
validatorHandler(subractItemSchema,'body'),
async (req, res,next) => {
  try{const Newcompra = await service.subtractItems(req.body);
    res.json(Newcompra);}catch(err){next(err);}
});
router.patch('/update-item',
validatorHandler(updateItemSchema,'body'),
async (req, res,next) => {
  try{
    const xupdate = await service.updateItem(req.body);
    res.json(xupdate);
  }
  catch(err){
    next(err);
  }
});


router.delete('/:negocioId/:compraId',
  validatorHandler(getcompraSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,compraId } = req.params;
  const delX = await service.delete(negocioId,compraId);
  res.json(delX);
  }catch(err){
    next(err);
  }
});


module.exports=router;
