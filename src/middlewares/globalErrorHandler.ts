import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import sendResponse from '../utils/sendResponse';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: string | any[] = [];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = err.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
  } else if (err instanceof Error) {
    message = err.message;
  }

  sendResponse(res, {
    success: false,
    statusCode: statusCode,
    message: message,
    data: null,
    error: errors.length ? errors : undefined,
  });
};

export default globalErrorHandler;
