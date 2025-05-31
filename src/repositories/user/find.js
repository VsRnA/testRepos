import db from '#infrastructure/sequelize.js';

export default async (query) => {
  const where = {}

  if (query.phone) where.phone = query.phone;

  const user = await db.Users.findOne({ where });

  if (!user) {
    throw new Error('User does not exist');
  }

  return user;
}