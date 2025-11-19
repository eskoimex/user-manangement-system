import express, { Application } from "express";
import postsRouter from "./routes/posts";
import usersRouter from "./routes/users";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";
import cors from "cors";

const app: Application = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://user-manangement-system.onrender.com",
  "https://user-manangement-system-lema.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(
      express.static(path.join(__dirname, "..", "..", "frontend", "dist"))
    );
}

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

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

app.use(errorHandler);

export default app;
