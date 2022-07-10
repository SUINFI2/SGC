const {models} = require('../libs/sequelize');

class UsuariosService {
  constructor(){

  }
  async create(negocioId,data){}
  async find(negocioId){
    const cliente  = await models.Usuario.findAll();

  return cliente;
  }
  async findOne(negocioId,usuarioId){}
  async update(negocioId,usuarioId,changes){}
  async delete(negocioId,usuarioId){}
}
module.exports = UsuariosService;
