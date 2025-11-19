import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectSchema } from "joi";
import { ValidationError } from "../exceptions/AppError";



export const validate = (schema: ObjectSchema): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message).join(", ");
      throw new ValidationError(errorMessages); // handled by global error handler
    }

    req.body = value;
    next();
  };
};

/**
 * Middleware to validate query parameters
 */
export const validateQuery = (schema: ObjectSchema): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message).join(", ");
      throw new ValidationError(errorMessages); // handled by global error handler
    }

    req.query = value;
    next();
  };
};

/**
 * For route parameter validation
 */
export const validateParams = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessages = error.details
        .map((detail) => detail.message)
        .join(", ");
      throw new ValidationError(errorMessages);
    }

    req.params = value;
    next();
  };
};


