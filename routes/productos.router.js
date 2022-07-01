const express=require('express');
const router=express.Router();
const ProductoService = require('../services/productos.service');
const service = new ProductoService();

router.get('/',(req,res)=>{
  const products=service.find();
   res.json(products);
});
router.get('/:id',(req,res)=>{
  const{id}=req.params;
  const producto = service.findOne(id);
  res.json(producto);

});
router.get('/filter',(req,res)=>{
  res.send('Yo soy un filter');
});



router.post('/', (req, res) => {
  const body = req.body;
  res.statusCode(2001).json({
    message: 'created',
    data: body
  });
});
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});

module.exports=router;
