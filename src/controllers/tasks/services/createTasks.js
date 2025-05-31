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
  for (const it of integrationTasks) {
    for (const pm of premises) {
      const key = `${it.guid}-${pm.id}`;
      if (!existingSet.has(key)) {
        toCreate.push({ 
          guid: randomUUID(),    
          iTaskGuid: it.guid, 
          premiseId: pm.id 
        });
      }
    }
  }

  if (toCreate.length === 0) {
    return [];
  }

  console.log(toCreate);

  const created = await rTask.bulkCreate(toCreate);
  return created;
}