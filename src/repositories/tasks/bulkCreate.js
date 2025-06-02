import db from '#infrastructure/sequelize.js'

export default async (createTaskData) => db.Tasks.bulkCreate(createTaskData);
