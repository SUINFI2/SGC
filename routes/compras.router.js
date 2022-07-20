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
  subractItemSchema
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
validatorHandler(getcompraSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,compraId}=req.params;
  const compra = await service.findOne(negocioId,compraId);
  res.json(compra);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createcompraSchema,'body'),
async (req, res) => {
  const body = req.body;
  const Newcompra = await service.create(body);
  res.json({
    message: 'created',
    data: Newcompra
  });
});

router.post('/add-item',
validatorHandler(addItemSchema,'body'),
async (req, res) => {
  const body = req.body;
  const Newcompra = await service.addItem(body);
  res.json({
    message: 'created',
    data: Newcompra
  });
});

router.delete('/subtract-items/:compraId/:productoId',
validatorHandler(subractItemSchema,'params'),
async (req, res) => {
  const body = req.body;
  const Newcompra = await service.subtractItems(req.params);
  res.json({
    message: 'created',
    data: Newcompra
  });
});






router.patch('/:negocioId/:compraId',
validatorHandler(getcompraSchema,'params'),
validatorHandler(updatecompraSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,compraId } = req.params;
    const body = req.body;
    const xupdate = await service.update(negocioId,compraId,body);
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
