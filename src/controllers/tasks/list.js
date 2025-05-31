import { rTask } from "#repos";

export default async (req, res) => {
  const { premiseId, type } = req.query;
  const listOptions = { premiseId, ...(type && { type }) };

  const tasks = await rTask.list(listOptions);
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const prefix = (path) => (path ? `${baseUrl}${path}` : null);

  const tasksWithLogoUrls = tasks.map((instance) => {
    const task = instance.toJSON?.() ?? { ...instance };

    const integrationTask = {
      ...(task.integrationTask ?? {}),
      logo: prefix(task.integrationTask?.logo),
      partner: {
        ...(task.integrationTask?.partner ?? {}),
        logoUrl: prefix(task.integrationTask?.partner?.logoUrl),
      },
    };

    return { ...task, integrationTask };
  });

  return res.status(200).json({ tasks: tasksWithLogoUrls });
};
