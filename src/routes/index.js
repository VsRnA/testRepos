import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadAllRoutes() {
  const routesDir = __dirname;
  const files = await readdir(routesDir);

  const allRoutes = [];

  for (const file of files) {
    if (file.endsWith('.routes.js') && file !== 'index.js') {
      const filePath = path.join(routesDir, file);
      const module = await import(filePath);
      const routesArray = module.default;
      if (Array.isArray(routesArray)) {
        allRoutes.push(...routesArray);
      }
    }
  }

  return allRoutes;
}

const allRoutesPromise = loadAllRoutes();

export default allRoutesPromise;
