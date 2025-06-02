import db from '#infrastructure/sequelize.js'

export default async () => db.Premises.findAll();
