import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error("Global error handler:", error);

  const statusCode = getStatusCode(error);
  const message = getErrorMessage(error);

  res.status(statusCode).json({
    success: false,
    error: {
      type: error.name || "InternalServerError",
      message,
      timestamp: new Date().toISOString(),
      path: req.path,
    },
  });
};

const getStatusCode = (error: any): number => {
  if (error.statusCode) return error.statusCode;
  if (error.name === "ValidationError") return 400;
  if (error.name === "NotFoundError") return 404;
  if (error.name === "AuthenticationError") return 401;
  if (error.name === "AuthorizationError") return 403;
  return 500;
};

const getErrorMessage = (error: any): string => {
  // Don't expose internal errors in production
  if (process.env.NODE_ENV === "production" && !error.isOperational) {
    return "Something went wrong";
  }
  return error.message || "Internal server error";
};
