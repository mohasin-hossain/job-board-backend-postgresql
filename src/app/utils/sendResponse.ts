import { Response } from 'express';

type IResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T | null;
  error?: any;
};

const sendResponse = <T>(res: Response, data: IResponse<T>): void => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    error: data.error,
  });
};

export default sendResponse;
