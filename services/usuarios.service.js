const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class UsuariosService {
  constructor(){

  }
  async create(negocioId,data){
    const newUser = await models.Usuario.create(data);
  }
  async find(negocioId){
    const cliente  = await models.Usuario.findAll();
    return cliente;
  }
  async findOne(negocioId,usuarioId){
    const user = await models.Usuario.findByPk(usuarioId);
    if(!user){ throw boom.notFound('User not found'); }
    return user;
  }
  async update(negocioId,usuarioId,changes){
    const user = await this.findOne(usuarioId);
    const rta = await user.update(changes);
    return rta;
  }
  async delete(negocioId,usuarioId){
    const user = await this.findOne(usuarioId);
    const rta = await user.destroy();
    return rta;
  }
}
module.exports = UsuariosService;
