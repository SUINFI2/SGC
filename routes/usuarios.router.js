const express=require('express');
const router=express.Router();
const UsuariosService = require('../services/usuarios.service');
const service = new UsuariosService();
const  {
  createusuarioSchema,
  updateusuarioSchema,
  getusuarioSchema
  } = require('../schemas/usuario.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const usuarios=await service.find(negocioId);
    res.json(usuarios);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:usuarioId',
validatorHandler(getusuarioSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,usuarioId}=req.params;
  const usuario = await service.findOne(negocioId,usuarioId);
  res.json(usuario);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createusuarioSchema,'body'),
async (req, res) => {
  const body = req.body;
  const Newusuario = await service.create(body);
  res.json({
    message: 'created',
    data: Newusuario
  });
});
router.patch('/:negocioId/:usuarioId',
validatorHandler(getusuarioSchema,'params'),
validatorHandler(updateusuarioSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,usuarioId } = req.params;
    const body = req.body;
    const xupdate = await service.update(negocioId,usuarioId,body);
    res.json(xupdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:usuarioId',
  validatorHandler(getusuarioSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,usuarioId } = req.params;
  const delX = await service.delete(negocioId,usuarioId);
  res.json(delX);
  }catch(err){
    next(err);
  }
});



module.exports=router;
