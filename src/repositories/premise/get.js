import db from '#infrastructure/sequelize.js';

export default async (query) => {
  const where = {}

  if (query.floor) where.floor = query.floor;
  if (query.number) where.number = query.number;

  return db.Premises.findOne({ where });
}