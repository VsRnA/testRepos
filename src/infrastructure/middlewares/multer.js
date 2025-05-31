// src/infrastructure/middlewares/uploadPartnerLogo.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'partners');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `partner-${Date.now()}${ext}`;
    cb(null, filename);
  }
});

export const uploadPartnerLogo = multer({ storage }).single('file');
