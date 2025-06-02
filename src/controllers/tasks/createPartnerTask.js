import { rPartner, rIntegrationTask } from '#repos';
import { randomUUID } from 'crypto';

export default async (req, res) => {
  const {
    apiKey,
    title,
    description,
    expiredAt,
    amount,
    type,
    priority,
    logoUrl
  } = req.body;

  if (!apiKey) {
    return res.status(400).json({ error: 'Поле "apiKey" обязательно' });
  }

  const partner = await rPartner.get({ apiKey });
  if (!partner) {
    return res.status(403).json({ error: 'Неверный apiKey' });
  }

  if (!title || !description || !expiredAt || !amount) {
    return res.status(400).json({
      error:
        'Не все обязательные поля задачи заполнены: title, description, expiredAt, amount'
    });
  }

  const payload = {
    guid: randomUUID(),
    title,
    description,
    expiredAt: new Date(expiredAt),
    amount: +amount,
    type: type || null,
    userId: null,
    priority: priority != null ? +priority : 0,
    partnerId: partner.id,
    logo: logoUrl
  };

  const newIntegrationTask = await rIntegrationTask.create(payload);
  
  return res.status(201).json({ integrationTask: newIntegrationTask });
};
