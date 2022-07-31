const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
class CategoriasService {
  async create(data) {
    const dat = await models.Categoria.create(data);
    if (!dat) {
      throw boom.notFound('Categoria Not Found');
    }
    return dat;
  }
  async find(id, query) {
    const options = {
      association: 'categorias',
      include: [],
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { productos } = query;
    if (productos) {
      options.include.push('productos');
    }

    const negocio = await models.Negocio.findByPk(id, {
      include: [options],
    });
    if (!negocio) {
      throw boom.notFound('Negocio Not Found');
    }
    return negocio.categorias;
  }
  async findOne(negocioId, categoriaId,query) {
    var options= {include: []};
    const categoria = await models.Categoria.findByPk(categoriaId,options);
    if (!categoria) {
      throw boom.notFound('categoria Not Found');
    }
    if(categoria.negocioId != negocioId){throw boom.conflict('La Categoria no pertenece al Negocio');}
    return categoria;
  }
  async update(negocioId, categoriaId, change) {
    const categoria = await this.findOne(negocioId, categoriaId);
    const rta = await categoria.update(change);
    return rta;
  }
  async delete(negocioId, categoriaId) {
    const categoria = await this.findOne(negocioId, categoriaId);
    const rta = await categoria.destroy();
    return rta;
  }
}
module.exports = CategoriasService;

