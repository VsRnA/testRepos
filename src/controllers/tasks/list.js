import { rTask } from "#repos";

export default async (req, res) => {
  const { premiseId, type } = req.query;
  const listOptions = { premiseId, ...(type && { type }) };

  const tasks = await rTask.list(listOptions);
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const fullUrl = path => path ? `${baseUrl}${path}` : null;

  const tasksWithLogoUrls = tasks.map(instance => {
    const task = instance.toJSON?.() ?? instance;
    const { integrationTask = {} } = task;
    const { logo, partner = {} } = integrationTask;

    return {
      ...task,
      integrationTask: {
        ...integrationTask,
        logo: fullUrl(logo),
        partner: {
          ...partner,
          logoUrl: fullUrl(partner.logoUrl),
        },
      },
    };
  });

  return res.status(200).json({ tasks: tasksWithLogoUrls });
};
