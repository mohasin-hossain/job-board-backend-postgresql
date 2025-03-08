import { NextFunction, Request, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return sendResponse(res, {
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: 'API Not Found!',
    data: null,
  });
};

export default notFound;
