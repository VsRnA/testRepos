export default async (query) => {
  const where = {};

  if (query.expiredGuids) where.guid = { guid: { [Op.in]: query.expiredGuids } }

  return db.IntegrationTasks.destroy({
    where
  });
}
