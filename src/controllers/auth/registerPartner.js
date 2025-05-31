import { randomUUID } from 'crypto';
import { rPartner } from '#repos';

/**
 * Обработчик создания нового партнёра.
 *
 * Ожидает multipart/form-data или JSON с полями:
 * @param {Object} req.body                   - Тело запроса.
 * @param {string} req.body.name              - Название компании (обязательно).
 * @param {string} [req.body.description]     - Описание компании (необязательно).
 * @param {Object} [req.file]                 - Объект файла, загруженного через multer (необязательно).
 * @param {string} req.file.filename          - Автогенерированное имя файла (логотипа).
 *
 * Возвращает JSON:
 * @returns {Object} res.status(201).json({
 *   partner: {
 *     id: number,
 *     name: string,
 *     apiKey: string,
 *     description: string | null,
 *     logoUrl: string | null,
 *     createdAt: string
 *   }
 * });
 */
export default async (req, res, next) => {
  try {
    console.log(req);
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Поле "name" обязательно' });
    }

    const existing = await rPartner.get({ name });
    console.log(existing);
    if (existing) {
      return res.status(409).json({ error: 'Партнёр с таким именем уже существует' });
    }

    const apiKey = randomUUID();
    let logoUrl = null;
    if (req.file && req.file.filename) {
      logoUrl = `/uploads/partners/${req.file.filename}`;
    }

    console.log(logoUrl);
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
  } catch (err) {
    return next(err);
  }
};

