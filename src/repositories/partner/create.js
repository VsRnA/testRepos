import db from '#infrastructure/sequelize.js';

export default async (partnerData) => db.Partners.create(partnerData);
