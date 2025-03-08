import { Request, Response } from 'express';
import { JobService } from './jobs.service';

const createJob = async (req: Request, res: Response) => {
  const result = await JobService.createJobIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'Job Created Successfully!',
    data: result,
  });
};

export const JobController = {
  createJob,
};
