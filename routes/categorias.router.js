const express=require('express');

const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const {checkRoles}=require('../middlewares/auth.handler');

const {
  createcategoriaSchema,
  updatecategoriaSchema,
  getcategoriaSchema,
  queryCategoriaSchema
  } = require('../schemas/categoria.schema');

const CategoriasService = require('../services/categorias.service');
const service = new CategoriasService();
const router=express.Router();


router.get('/',
passport.authenticate('jwt', { session: false }),
validatorHandler(queryCategoriaSchema,'query'),
async (req,res,next)=>{
  try{
    const user = req.user;
    const products=await service.find(user.tenant,req.query);
    res.json(products);
  }catch(err){
    next(err);
  }
});
router.get('/:categoriaId',
passport.authenticate('jwt', { session: false }),
validatorHandler(getcategoriaSchema, 'params'),
async (req,res,next)=>{
  try{
    const user = req.user;
    const{categoriaId}=req.params;
  const categoria = await service.findOne(user.tenant,categoriaId);
  res.json(categoria);
  }catch(err){
    next(err);
  }
});
router.post('/',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
validatorHandler(createcategoriaSchema,'body'),
async (req, res,next) => {
 try{ const body = req.body;
  const Newcategoria = await service.create(body);
  res.json({
    message: 'created',
    data: Newcategoria
  });}catch(err){next(err);}
});
router.patch('/:categoriaId',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
validatorHandler(getcategoriaSchema,'params'),
validatorHandler(updatecategoriaSchema,'body'),
async (req, res,next) => {
  try{
    const user = req.user;
    const {categoriaId } = req.params;
    const prodUpdate = await service.update(user.tenant,categoriaId,req.body);
    res.json(prodUpdate);
  }
  catch(err){
    next(err);
  }
});
router.delete('/:categoriaId',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getcategoriaSchema,'params'),
  async(req, res,next) => {
  try{
    const user = req.user;
    const {categoriaId } = req.params;
  const delProd = await service.delete(user.tenant,categoriaId);
  res.json(delProd);
  }catch(err){
    next(err);
  }
});

module.exports=router;
