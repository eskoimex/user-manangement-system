// app.ts
import express, { Application } from "express";
import postsRouter from "./routes/posts";
import usersRouter from "./routes/users";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";

const app: Application = express();

// Security headers (consider using helmet in production)
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

// CORS middleware - update for production
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://user-manangement-system.onrender.com", 
  ];
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
}

// Routes
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      type: "NotFoundError",
      message: `Endpoint ${req.method} ${req.originalUrl} not found`,
      timestamp: new Date().toISOString(),
    },
  });
});

// Global error handler - MUST BE LAST
app.use(errorHandler);

export default app;
