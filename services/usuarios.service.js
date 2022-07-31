const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const CuentasService = require('./cuentas.service');
const service = new CuentasService();
class UsuariosService {
  async create(data) {
    const newCuenta = await service.create({
      negocioId: data.negocioId,
      rubroId: 2,
      nombre: data.nombre,
    });
    if(!newCuenta){throw boom.notFound('create New Cuenta Not Found');}

    const hashPass = await bcrypt.hash(data.password, 5);
    const newUsuario = await models.Usuario.create({
      ...data,
      password: hashPass,
      cuentaId: newCuenta.id,
    });
    if (!newUsuario) {
      await newCuenta.destroy();
      throw boom.notFound();
    }
    delete newUsuario.getDataValue.password;
    return newUsuario;
  }
  async find(negocioId) {
    const negocio = await models.Negocio.findByPk(negocioId, {
      include: ['usuarios'],
    });
    if (!negocio) {
      throw boom.notFound('Negocio not found');
    }
    return negocio.usuarios;
  }
  async findOne(negocioId, usuarioId, query) {
    var options = { include: [] };

    const { cuenta } = query;

    if (cuenta) {
      options.include.push('cuenta');
    }
    const user = await models.Usuario.findByPk(usuarioId, options);
    if (!user) {
      throw boom.notFound('User not found');
    }
    if (user.negocioId != negocioId) {
      throw boom.conflict('Usuario no pertence al Negocio');
    }
    return user;
  }
  async update(negocioId, usuarioId, changes) {
    const user = await this.findOne(negocioId, usuarioId);
    const rta = await user.update(changes);
    return rta;
  }
  async delete(negocioId, usuarioId) {
    const user = await this.findOne(negocioId, usuarioId,{cuenta: true});

    const rta = await user.destroy();
    await user.cuenta.destroy();
    return user;
  }
}
module.exports = UsuariosService;
