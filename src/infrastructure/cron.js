import createTasks from '#controllers/tasks/services/createTasks.js';
import { purgeExpiredIntegrationTasks } from '#controllers/tasks/services/purgeExpiredIntegrationTasks.js';
import { CronJob } from 'cron';

const jobs = [
  {
    service: createTasks,
    description: 'Закрепление задач за пользователями',
    time: '00 00 00 */1 * *',
  },
  {
    service: purgeExpiredIntegrationTasks,
    description: 'Удаление задач которые прошли по сроку',
    time: '00 00 00 */1 * *'
  }
];

const crons = [];
export async function runCronTasks() {
  jobs.forEach((job) => {
    const { service, time } = job;
    if (service) {
      crons.push(new CronJob(time, () => service(), null, true));
    }
  });
}
