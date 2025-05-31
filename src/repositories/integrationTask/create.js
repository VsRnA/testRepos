import db from '#infrastructure/sequelize.js';

export default async (integrationTaskData) => db.IntegrationTasks.create(integrationTaskData);
