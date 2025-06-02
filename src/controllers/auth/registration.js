import { rUser, rPremise } from "#repos";
import jwt from 'jsonwebtoken';
import config from '#config/config.js';

const TOKEN_EXPIRATION = '1h';

export default async (req, res) => {
  const { phone, floor, number, ...userData } = req.body;

  const existingUser = await rUser.get({ phone });
  if (existingUser) {
    return res.status(409).json({ error: 'A user with this phone number already exists' });
  }

  let premise = await rPremise.get({ floor, number });
  if (!premise) {
    premise = await rPremise.create({ floor, number });
  }

  const createdUser = (await rUser.create({
    phone,
    premiseId: premise.id,
    ...userData,
  })).toJSON();

  const accessToken = jwt.sign(
    { phone: createdUser.phone },
    config.jwtSecret,
    { expiresIn: TOKEN_EXPIRATION }
  );

  return res.status(201).json({
    token: accessToken,
    user: createdUser,
  });
}
