import { rIntegrationTask, rTask, rPremise } from "#repos"
import { randomUUID } from 'crypto';

export default async () => {
  const integrationTasks = await rIntegrationTask.list();
  const premises = await rPremise.list();
  const existingTasks = await rTask.list();

  const existingSet = new Set(
    existingTasks.map((t) => `${t.iTaskGuid}-${t.premiseId}`)
  );

  const toCreate = [];
  for (const integrationTask of integrationTasks) {
    for (const premise of premises) {
      const compositeKey = `${integrationTask.guid}-${premise.id}`;
      if (!existingSet.has(compositeKey)) {
        toCreate.push({
          guid: randomUUID(),
          iTaskGuid: integrationTask.guid,
          premiseId: premise.id
        });
      }
    }
  }

  if (toCreate.length === 0) {
    return [];
  }

  await rTask.bulkCreate(toCreate);
}
