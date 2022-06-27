const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
  const products=[{},{}];
  const{size}=req.query;
   res.json(products);
});

router.get('/filter',(req,res)=>{
  res.send('Yo soy un filter');
});

router.get('/:id',(req,res)=>{
  const{id}=req.params;
  res.json({id,name:'Product 2',price:2000})
;});

module.exports=router;
