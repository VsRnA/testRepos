// src/controllers/createIntegrationTask.js
import { rPartner, rIntegrationTask } from '#repos';
import { randomUUID } from 'crypto';
import path from 'path';

/**
 * @typedef {Object} CreateIntegrationTaskRequestBody
 * @property {string} apiKey            - API-ключ партнёра (обязательно).
 * @property {string} title             - Заголовок задачи (обязательно).
 * @property {string} description       - Описание задачи (обязательно).
 * @property {string} expiredAt         - Дата окончания задачи в формате ISO (обязательно).
 * @property {string|number} amount     - Числовое значение, например сумма или количество (обязательно).
 * @property {string} [type]            - Дополнительный тип задачи (необязательно).
 * @property {string|number} [priority] - Приоритет задачи (необязательно, по умолчанию 0).
 */

/**
 * @typedef {Object} IntegrationTaskResponse
 * @property {string} guid               - Уникальный идентификатор задачи (UUID).
 * @property {string} title              - Заголовок задачи.
 * @property {string} description        - Описание задачи.
 * @property {string} expiredAt          - Дата окончания задачи (ISO 8601).
 * @property {number} amount             - Числовое значение задачи.
 * @property {string|null} type          - Тип задачи или null.
 * @property {number|null} userId        - ID пользователя или null.
 * @property {number} priority           - Приоритет задачи.
 * @property {number} partnerId          - ID связанного партнёра.
 * @property {string|null} logo          - Относительный путь до загруженного логотипа (или null).
 * @property {string} createdAt          - Дата и время создания записи (ISO 8601).
 * @property {string} updatedAt          - Дата и время последнего обновления записи (ISO 8601).
 */

/**
 * Обработчик создания новой задачи интеграции.
 *
 * Ожидает multipart/form-data запрос, где:
 * - Поля текстовые в `req.body` должны соответствовать {@link CreateIntegrationTaskRequestBody}.
 * - Опционально: один файл в `req.file` (поле `file`) – логотип задачи.
 *
 * Возвращает JSON:
 * - В случае успеха (201 Created):
 *   ```json
 *   {
 *     "integrationTask": {
 *       "guid": "string",
 *       "title": "string",
 *       "description": "string",
 *       "expiredAt": "ISO 8601 string",
 *       "amount": number,
 *       "type": "string or null",
 *       "userId": null,
 *       "priority": number,
 *       "partnerId": number,
 *       "logo": "string or null",
 *       "createdAt": "ISO 8601 string",
 *       "updatedAt": "ISO 8601 string"
 *     }
 *   }
 *   ```
 * - В случае ошибки валидации (400 Bad Request):
 *   ```json
 *   { "error": "описание ошибки" }
 *   ```
 * - В случае неверного `apiKey` (403 Forbidden):
 *   ```json
 *   { "error": "Неверный apiKey" }
 *   ```
 * - В случае внутренней ошибки сервера (500 Internal Server Error):
 *   ```json
 *   { "error": "Не удалось создать задачу" }
 *   ```
 *
 * @param {import('express').Request & { body: CreateIntegrationTaskRequestBody, file?: Express.Multer.File }} req
 * @param {import('express').Response} res
 * @returns {Promise<import('express').Response>}
 */
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

  try {
    const newIntegrationTask = await rIntegrationTask.create(payload);
    return res.status(201).json({ integrationTask: newIntegrationTask });
  } catch (err) {
    console.error('Ошибка при создании IntegrationTask:', err);
    return res.status(500).json({ error: 'Не удалось создать задачу' });
  }
};
