import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
  cronEnable: process.env.CRON_ENABLE || true
};

export default config;
