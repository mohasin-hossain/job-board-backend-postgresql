import { Request, Response } from 'express';
import { JobService } from './jobs.service';
import sendResponse from '../../utils/sendResponse';

const createJob = async (req: Request, res: Response) => {
  const job = await JobService.createJobIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Job created successfully',
    data: job,
  });
};

const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await JobService.getAllJobsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Jobs retrieved successfully!',
    data: jobs,
  });
};

const getJobById = async (req: Request, res: Response) => {
  const job = await JobService.getJobByIdFromDB(Number(req.params.id));

  sendResponse(res, {
    success: !!job,
    statusCode: job ? 200 : 404,
    message: job ? 'Job found!' : 'Job not found!',
    data: job,
  });
};

export const JobController = {
  createJob,
  getAllJobs,
  getJobById,
};
