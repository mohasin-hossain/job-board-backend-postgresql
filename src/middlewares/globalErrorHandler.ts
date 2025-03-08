import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../errors/apiError';
import sendResponse from '../utils/sendResponse';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Default values
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: Array<{ path: string; message: string }> = [];

  // Handle different error types
  if (err instanceof ZodError) {
    // Zod validation errors
    statusCode = 400;
    message = 'Validation Error';
    errors = err.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
  } else if (err instanceof ApiError) {
    // Custom API errors
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    // Generic errors
    message = err.message;
  }

  // Send formatted response
  sendResponse(res, {
    success: false,
    statusCode,
    message,
    data: null,
    error: errors.length > 0 ? errors : undefined,
  });
};

export default globalErrorHandler;
