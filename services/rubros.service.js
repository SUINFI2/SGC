const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class RubrosService {
  constructor() {
    this.rubros = [
      { nombre: 'cobros y pagos' },
      { nombre: 'usuarios/empleados' },
      { nombre: 'clientes' },
      { nombre: 'proveedores' },
    ];
  }
  async generate() {
    this.rubros.forEach(async (item) => {
      await models.Rubro.create(item);
    });
  }

  async find(query) {
    const { negocioId } = query;
    var option = {};
    if (negocioId) {
      option = {
        include: [
          {
            association: 'cuentas',
            where: {
              negocioId: negocioId,
            },
          },
        ],
      };
    }
    const rubros = await models.Rubro.findAll(option);
    if (!rubros) {
      throw boom.notFound('Rubros Not Found');
    }

    return rubros;
  }
}
module.exports = RubrosService;
