// import express, { Application } from "express";
// import config from "config";
// import postsRouter from "./routes/posts";
// import usersRouter from "./routes/users";
// import  {errorHandler}  from "./middleware/errorHandler";
// const port = config.get("port") as number;

// const app: Application = express();
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.use(express.json());

// app.use("/posts", postsRouter);
// app.use("/users", usersRouter);

// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
// });

// app.use((req, res) => {
//   res.status(404).json({ error: "Endpoint not found" });
// });


// app.use(errorHandler);


// app.listen(port, () => {
//   console.log(`API server is running on port ${port}`);
// });
// server.ts
import app from './app';
import config from 'config';

const PORT = config.get('port') || 3000;

// Handle uncaught exceptions (synchronous errors)
process.on('uncaughtException', (error: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(error.name, error.message);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections (async errors)
process.on('unhandledRejection', (error: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated');
  });
});

export default server;