import db from '#infrastructure/sequelize.js';

export default async (updatedData, where ) => db.Tasks.update(updatedData, { where });