const  Generador = require('../modules/Generador');
const sequelize = require('../libs/sequelize');
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
    // verificar que el s no exista
    // agregarle id
    // agregar producto
    // retornar product
    if(await Service.exits(negocioId)===true){

    }else{ throw boom.notFound('negocio not found');}
    return true;
  }
   async find(negocioId){
     const query = 'SELECT * FROM tasks'
      const [data, metadata] = await sequelize.query(query);
      return {
        data,
        metadata
      };
    }
  async findOne(negocioId,productoId){
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
