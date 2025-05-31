import db from '#infrastructure/sequelize.js';

export default (premiseData) => db.Premises.create(premiseData);