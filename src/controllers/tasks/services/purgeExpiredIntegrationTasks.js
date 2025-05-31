import { rIntegrationTask } from '#repos';

export async function purgeExpiredIntegrationTasks() {

  try {
    const expiredTasks = await rIntegrationTask.list({ expiredAt: new Date() });

    if (expiredTasks.length === 0) {
      return [];
    }
    const expiredGuids = expiredTasks.map(task => task.guid);

    await rIntegrationTask.destroy(expiredGuids);

    return expiredTasks;
  } catch (err) {
    console.error('Ошибка при удалении устаревших IntegrationTasks:', err);
    throw err;
  }
}
