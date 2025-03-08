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

const getAllJobs = async (req: Request, res: Response) => {
  const result = await JobService.getAllJobsFromDB();

  res.status(200).json({
    success: true,
    message: 'Jobs retrieved successfully!',
    data: result,
  });
};

const getJobById = async (req: Request, res: Response) => {
  const result = await JobService.getJobByIdFromDB(Number(req.params.id));

  res.status(200).json({
    success: true,
    message: 'Jobs retrieved successfully!',
    data: result,
  });
};

export const JobController = {
  createJob,
  getAllJobs,
  getJobById,
};
