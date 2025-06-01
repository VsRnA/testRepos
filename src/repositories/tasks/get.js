import db from '#infrastructure/sequelize.js'

export default async (query) => {
  const where = {};

  if (query.guid) where.guid = query.guid;
  if (query.premiseId) where.premiseId = query.premiseId;

  console.log(where);
  return db.Tasks.findOne({ where })
}