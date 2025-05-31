import jwt from 'jsonwebtoken';

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.substring(7);

  try {
    // TO DO: Доделать когда будет взаимодействием с пользователем
    // const payload = jwt.verify(token, JWT_SECRET);
    // const user = await getUserById(payload.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.context = req.context || {};
    req.context.user = user;

    next();
  } catch (err) {
    console.warn('JWT verification failed:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
