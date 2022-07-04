const express=require('express');
const router=express.Router();
const ProductoService = require('../services/productos.service');
const service = new ProductoService();

router.get('/',async (req,res)=>{
  const products=await service.find();
   res.json(products);
});
router.get('/:id',async (req,res)=>{
  const{id}=req.params;
  const producto = await service.findOne(id);
  res.json(producto);
});
router.get('/filter',(req,res)=>{
  res.send('Yo soy un filter');
});



router.post('/', (req, res) => {
  const body = req.body;
  const Newproducto = service.create(body);
  res.json({
    message: 'created',
    data: Newproducto
  });
});
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const prodUpdate = service.update(id,body);
  res.json(prodUpdate);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const delProd = service.delete(id);
  res.json(delProd);
});

module.exports=router;
