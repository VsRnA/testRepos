import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import sequelize from '../../config/sequelize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = { Sequelize, sequelize };

async function initDb() {
  const files = fs.readdirSync(__dirname).filter(f => f !== 'index.js' && f.endsWith('.js'));

  for (const file of files) {
    const modelImport = await import(path.join(__dirname, file));
    const defineModel = modelImport.default;
    const model = await defineModel(sequelize);
    db[model.name] = model;
  }

  Object.values(db)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(db));

  // await sequelize.sync({ force: true });
  return db;
}

export default await initDb();

