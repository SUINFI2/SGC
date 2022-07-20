const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
class VentasService {
  async find(id, query) {
    const createdAt = {};
    const { fecha_min, fecha_max } = query;
    if (fecha_min && fecha_max) {
      createdAt = {
        [Op.gte]: fecha_min,
        [Op.lte]: fecha_max,
      };
    }
    const negocio = await models.Negocio.findByPk(id, {
      include: [
        {
          association: 'pagos',
          where: {
            createdAt
          },
        },
        {
          association: 'compras',
          where: {
            createdAt,
          },
        },
        {
          association: 'cobros',
          where: {
            createdAt
          },
        },
        {
          association: 'ventas',
          where: {
            createdAt
          },
        },
      ],
    });

    if (!negocio) {
      throw boom.notFound('Informe Not Found');
    }
    return negocio.ventas;
  }
}
module.exports = VentasService;
