const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class UsuariosService {

  async create(data){
    const dat = await models.Usuario.create(data,{include: ['cuenta']});
    return dat;
  }
  async find(negocioId){
    const negocio  = await models.Negocio.findByPk(negocioId,{include:['usuarios']});
    if(!negocio){ throw boom.notFound('Negocio not found'); }
    return negocio.usuarios;
  }
  async findOne(negocioId,usuarioId){


    const usuarios = await this.find(negocioId);
    const user = await usuarios.find(item => item.id == usuarioId);
    if(!user){ throw boom.notFound('User not found'); }
    return user;
  }
  async update(negocioId,usuarioId,changes){
    const user = await this.findOne(negocioId, usuarioId);
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
