const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CustomersService {
  async create(negocioId,data){
    const rta = await models.Customer.create({
      include: ['usuario']
    });
    return rta;
  }
  async find(negocioId){
    const rta = await models.Customer.findAll(
      {include: [' usuario']}
    );
    return rta;
  }
  async findOne(negocioId,customerId){
    const rta = await models.Customer.findByPk(customerId);
    if(!rta){ throw boom.notFound('Customer Not Found');}
    return rta;
  }
  async update(negocioId,customerId,changes){
    const custo = await this.findOne(customerId);
    const rta = await custo.update(changes);
    return rta;
  }
  async delete(negocioId,customerId){
    const custo = await this.findOne(customerId);
    const rta = await custo.destroy();
    return rta;
  }
}
module.exports = CustomersService;
