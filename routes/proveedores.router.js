const express=require('express');
const router=express.Router();
const ProveedoresService = require('../services/proveedores.service');
const service = new ProveedoresService();
const  {
  createproveedorSchema,
  updateproveedorSchema,
  getproveedorSchema
  } = require('../schemas/proveedor.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const proveedors=await service.find(negocioId);
    res.json(proveedors);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:proveedorId',
validatorHandler(getproveedorSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,proveedorId}=req.params;
  const proveedor = await service.findOne(negocioId,proveedorId);
  res.json(proveedor);
  }catch(err){
    next(err);
  }
});
router.post('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
validatorHandler(createproveedorSchema,'body'),
async (req, res) => {
  const {negocioId} = req.params;
  const body = req.body;
  const Newproveedor = await service.create(negocioId,body);
  res.json({
    message: 'created',
    data: Newproveedor
  });
});
router.patch('/:negocioId/:proveedorId',
validatorHandler(getproveedorSchema,'params'),
validatorHandler(updateproveedorSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,proveedorId } = req.params;
    const body = req.body;
    const xupdate = await service.update(negocioId,proveedorId,body);
    res.json(xupdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:proveedorId',
  validatorHandler(getproveedorSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,proveedorId } = req.params;
  const delX = await service.delete(negocioId,proveedorId);
  res.json(delX);
  }catch(err){
    next(err);
  }
});



module.exports=router;
