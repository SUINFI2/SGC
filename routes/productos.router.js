const express=require('express');
const router=express.Router();
const ProductoService = require('../services/productos.service');
const {createProductoSchema,
  updateProductoSchema,
  getProductoSchema,
  getNegocioSchema} = require('../schemas/producto.schema');
const validatorHandler = require('../middlewares/validator.handler');
const service = new ProductoService();

router.get('/:negocioId',
validatorHandler(getNegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const products=await service.find(negocioId);
    res.json(products);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:productoId',
validatorHandler(getProductoSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,productoId}=req.params;
  const producto = await service.findOne(negocioId,productoId);
  res.json(producto);
  }catch(err){
    next(err);
  }
});



router.post('/:negocioId',
validatorHandler(getNegocioSchema,'params'),
validatorHandler(createProductoSchema,'body'),
async (req, res) => {
  const {negocioId} = req.params;
  const body = req.body;
  const Newproducto = await service.create(negocioId,body);
  res.json({
    message: 'created',
    data: Newproducto
  });
});
router.patch('/:negocioId/:productoId',
validatorHandler(getProductoSchema,'params'),
validatorHandler(updateProductoSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,productoId } = req.params;
    const body = req.body;
    const prodUpdate = await service.update(negocioId,productoId,body);
    res.json(prodUpdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:productoId',
  validatorHandler(getProductoSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,productoId } = req.params;
  const delProd = await service.delete(negocioId,productoId);
  res.json(delProd);
  }catch(err){
    next(err);
  }
});

module.exports=router;
