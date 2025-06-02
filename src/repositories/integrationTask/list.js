import db from '#infrastructure/sequelize.js';

export default async (query = {}) => {
  const where = {};

  if (query.expiredAt) where.expiredAt = { expiredAt: { [Op.lt]: query.expiredAt } }

  return db.IntegrationTasks.findAll({
    where,
  })
}
