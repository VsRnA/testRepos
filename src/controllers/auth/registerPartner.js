import { randomUUID } from 'crypto';
import { rPartner } from '#repos';

export default async (req, res, next) => {
  const { name, description, logoUrl } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Поле "name" обязательно' });
  }

  const existing = await rPartner.get({ name });
  if (existing) {
    return res.status(409).json({ error: 'Партнёр с таким именем уже существует' });
  }

  const apiKey = randomUUID();

  const newPartner = await rPartner.create({
    name,
    description: description || null,
    apiKey,
    logoUrl 
  });

  return res.status(201).json({
    partner: {
      id: newPartner.id,
      name: newPartner.name,
      apiKey: newPartner.apiKey,
      description: newPartner.description,
      logoUrl: newPartner.logoUrl,
      createdAt: newPartner.createdAt.toISOString()
    }
  });
};
