import db from '#infrastructure/sequelize.js';

export default async (query) => {
  const where = {}

  if (query.name) where.name = query.name;
  if (query.apiKey) where.apiKey = query.apiKey;

  return db.Partners.findOne({ where, logging: true });
}
