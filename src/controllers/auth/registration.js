import { rUser, rPremise } from "#repos";
import jwt from 'jsonwebtoken';
import config from '#config/config.js';

export default async (request, res) => {

  const { phone, floor, number, ...userData } = request.body;

  const existingUser = await rUser.get({ phone });
  if (existingUser) {
    return res.status(409).json({ error: 'Пользователь с таким телефоном уже существует' });
  }

  let premise = await rPremise.get({ floor, number });
  if (!premise) {
    premise = await rPremise.create({ floor, number });
  }

  const createdUser = (await rUser.create({
    phone,
    premiseId: premise.id,
    ...userData
  })).toJSON();

  const accessToken = jwt.sign(
    { phone: createdUser.phone },
    config.jwtSecret,
    { expiresIn: '1h' }
  );

  return res.status(201).json({
    token: accessToken,
    user: createdUser
  });
}