import db from '#infrastructure/sequelize.js';

export default async (userData) => db.Users.create(userData);
