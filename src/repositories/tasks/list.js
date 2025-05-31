import db from '#infrastructure/sequelize.js'

export default async (query = {}) => {
  const where = {};
  const integrationTaskWhere = {};

  if (query.type) integrationTaskWhere.type = query.type;
  if (query.premiseId) where.premiseId = query.premiseId;

  const include = [
    {
      model: db.IntegrationTasks,
      as: 'integrationTask',
      where: integrationTaskWhere,
      include: [
        {
          model: db.Partners,
          as: 'partner',
        },
      ]
    }
  ];

  return db.Tasks.findAll({ where, include })
}