import { Request, Response, NextFunction } from "express";

/**
 * Wraps async route handlers to automatically catch errors and pass them to Express error handler
 * Completely eliminates need for try/catch blocks in controllers
 */

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};
