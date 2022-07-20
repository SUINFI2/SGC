const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class CategoriasService {
  async create(data){
    const dat = await models.Categoria.create(data);
    return dat;
  }
   async find(id){
      const negocio  = await models.Negocio.findByPk(id,{include:['categorias']});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.categorias;
    }
  async findOne(negocioId,categoriaId){
    const categorias  = await this.find(negocioId);
    const categoria = await categorias.find((items) => items.id == categoriaId);
    if(!categoria){ throw boom.notFound('categoria Not Found');}
     return categoria;
  }
  async update(negocioId,categoriaId, change){
   const categoria = await this.findOne(negocioId,categoriaId);
   const rta = await categoria.update(change);
   return rta;
  }
  async delete(negocioId,categoriaId){
    const categoria = await this.findOne(negocioId,categoriaId);
    const rta = await categoria.destroy();
    return rta;
  }
}
module.exports = CategoriasService;
