import { rUser } from "#repos";
import jwt from 'jsonwebtoken';
import config from '#config/config.js';

export default async (request, response) => {
  const { phone, password } = request.body;
  
  
  const existingUser = await rUser.get({ phone });
  if (!existingUser) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }


  const token = jwt.sign({ phone }, config.jwtSecret, { expiresIn: '1h' });

  return response.json({ token, user: existingUser })
}
