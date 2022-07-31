
const {models} = require('../libs/sequelize');
const {Op}=require('sequelize');
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
   async find(id,query){
    const options= {
      association: 'productos',
      where:{}
    };
    const {limit,offset} = query;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    const {costo} = query;
    if(costo){ options.where.costo= costo;}
    const {costo_min,costo_max} = query;
    if(costo_min && costo_max){
      options.where.costo= {
        [Op.gte]: costo_min,
        [Op.lte]: costo_max
      };
    }
      const negocio  = await models.Negocio.findByPk(id,{include:[options]});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.productos;
    }
  async findOne(negocioId,productoId){
    const producto = await models.Producto.findByPk(productoId);
    if(!producto){ throw boom.notFound('Producto Not Found');}
    if(producto.negocioId!=negocioId){throw boom.conflict('Producto no pertence al Negocio');}
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
