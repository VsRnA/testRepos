import killPort from 'kill-port';
import sequelize from '#config/sequelize.js';
import app from '#config/express.js';
import config from '#config/config.js';
import { runCronTasks } from '#infrastructure/cron.js';

async function startServer() {
  const server = app.listen(config.port, '0.0.0.0' ,() => {
    console.info(`Server started on port ${config.port}`);

    if (config.cronEnable) {
      runCronTasks();
    }
  });

  server.on('error', async (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Порт ${config.port} уже занят. Пытаюсь освободить...`);
      try {
        await killPort(config.port);
        console.info(`Порт ${config.port} освобождён. Перезапускаю сервер через 500мс…`);
        setTimeout(startServer, 500);
      } catch (killErr) {
        console.error(`Не удалось убить процесс на порту ${config.port}:`, killErr);
        process.exit(1);
      }
    } else {
      console.error('Ошибка при запуске сервера:', err);
      process.exit(1);
    }
  });
}

try {
  await sequelize.authenticate();
  console.log('Connection to the database has been established successfully.');

  await startServer();
} catch (err) {
  console.error('Server initialization error:', err);
  process.exitCode = 1;
  process.kill(process.pid, 'SIGINT');
}
