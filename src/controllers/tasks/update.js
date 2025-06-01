import { rTask } from "#repos";

export default async (req, res) => {
  const { guid, premiseId } = req.body;
  if (!guid || typeof premiseId === 'undefined') {
    return res.status(400).json({ error: 'Не передан guid или premiseId' });
  }

  const task = await rTask.get({ guid, premiseId});

  if (!task) {
    return res.status(404).json({ error: 'Задача не найдена' });
  }

  task.marker = true;
  await rTask.update(task, { guid, premiseId });

  return res.status(200).json(task);
}