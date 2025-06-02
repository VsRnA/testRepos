import db from '#infrastructure/sequelize.js';

export default async (query) => {
  const where = {}

  if (query.floor) where.floor = query.floor;
  if (query.number) where.number = query.number;

  const premise = await db.Premises.findOne({ where });

  if (!premise) {
    throw new Error('premise does not exist');
  }

  return premise;
}
