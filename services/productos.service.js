
const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class ProductoService{
  async create(data){

    // antes debo verificar que la categoria corresponda al negocio.

    const neg = await models.Negocio.findByPk(data.negocioId,{include:['categorias']});
    const rta = await neg.categorias.find(item => item.id === data.categoriaId);
    if(!rta){throw boom.notFound('Categoria Not Found');}
    const newproducto = await models.Producto.create(data);
    return newproducto;
  }
   async find(id){
      const negocio  = await models.Negocio.findByPk(id,{include:['productos']});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.productos;
    }
  async findOne(negocioId,productoId){
    const productos  = await this.find(negocioId);
    const producto = await productos.find((items) => items.id == productoId);
    if(!producto){ throw boom.notFound('Producto Not Found');}
     return producto;
  }
  async update(negocioId,productoId, change){
   const producto = await this.findOne(negocioId,productoId);
   const rta = await producto.update(change);
   return rta;
  }
  async delete(negocioId,productoId){
    const producto = await this.findOne(negocioId,productoId);
    const rta = await producto.destroy();
    return rta;
  }
}
module.exports = ProductoService;
