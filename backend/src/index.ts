import app from './app';
import config from 'config';

const PORT = config.get('port') || 3000;

process.on('uncaughtException', (error: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(error.name, error.message);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('unhandledRejection', (error: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated');
  });
});

export default server;