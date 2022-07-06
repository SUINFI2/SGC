const  Generador = require('../modules/Generador');
const boom = require('@hapi/boom');
const NegeociosService = require('./negocios.service');
const Service = new NegeociosService();
class ProductoService{

  constructor(){
    this.productos=[];
    this.generate();
  }
  generate(){
    this.productos = [
      {id:'1', nombre:"prd1", price: 100, negocioId: "a1"},
      {id:'11', nombre:"prd2", price: 300, negocioId: "a1"},
      {id:'2', nombre:"prd2", price: 200, negocioId: "a2"},
      {id:'3', nombre:"prd3", price: 300, negocioId: "a3"}
    ]
  }
  async create(negocioId,data){

  const Newproducto ={
        id: Generador.NewCodProd(this.productos),
        NegocioId: negocioId,
        ...data
    }
    const negocio = Service.findOne(negocioId);
    this.productos.push(Newproducto);
    return Newproducto;
  }
   find(negocioId){

    if(!Service.findOne(negocioId)){
      return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(this.productos.filter(item => item.negocioId === negocioId));


      }, 1200);
      });}else{ throw boom.notFound('negocio not found');}
  }
  async findOne(negocioId,productoId){

    var producto;
    await this.find(negocioId)
    .then(data => {

    producto =   data.find(item => item.id === productoId);
      if(!producto)
      {throw boom.notFound('Product not found');}

    } );
    return producto;
  }
  async update(negocioId,productoId, change){
    var index;
    await this.find(negocioId)
    .then(data => {
      index =   data.findIndex(item => item.id === productoId);
      if(index===-1)
      {throw boom.notFound('Product not found');}
      const producto = this.productos[index];
      this.productos[index] = {
      ...producto,
      ...change
        }
    } );
    return this.productos[index] ;
  }
  async delete(negocioId,productoId){
    var index;
    await this.find(negocioId)
    .then(data => {
      index =   data.findIndex(item => item.id === productoId);
      if(index===-1)
      {throw boom.notFound('Product not found');}
      this.productos.splice(index,1);
    } );
    return {productoId};
  }
}
module.exports = ProductoService;
