class ProductoService{

  constructor(){
    this.productos=[];
    this.generate();
  }
  generate(){
    this.productos = [
      {id:'12', nombre:"prd1"},
      {id:'13', nombre:"prd2"},
      {id:'14', nombre:"prd3"}
    ]
  }
  create(){}
  find(){
    return this.productos;
  }
  findOne(id){
    return this.productos.find((items) => items.id === id);
  }
  update(id, change){}
  delete(id){}
}
module.exports = ProductoService;
