import db from '#infrastructure/sequelize.js';

export default async (query) => {
  const where = {}

  if (query.phone) where.phone = query.phone;

  return db.Users.findOne({ where });
}
