import sequelize from '#config/sequelize.js';
import app from '#config/express.js';
import config from '#config/config.js';
import db from '#infrastructure/sequelize.js'

try {
  await sequelize.authenticate();
  console.log('Connection to the database has been established successfully.');
  app.listen(config.port, () => {
    console.info(`Server started on port ${config.port}`);
  });
} catch (err) {
  console.error('Server initialization error:', err);
  process.exitCode = 1;
  process.kill(process.pid, 'SIGINT');
}
