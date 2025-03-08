import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ApplicationService } from './applications.service';
import { JobModel } from '../jobs/jobs.model';

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const application = await ApplicationService.createApplicationIntoDB(
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Application submitted successfully',
    data: application,
  });
});

const getAllApplicationsByJobId = catchAsync(
  async (req: Request, res: Response) => {
    const jobId = Number(req.params.job_id)    

    // Check If Job Exists First
    const jobExists = await JobModel.getById(jobId);
    if (!jobExists) {
      throw new Error("There is no job with this job id!");
    }

    const applications =
      await ApplicationService.getAllApplicationsByJobIdFromDB(
        Number(req.params.job_id),
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        applications.length > 0
          ? 'Applications retrieved successfully'
          : 'Unfortunately, No Applications found for this job!',
      data: applications,
    });
  },
);

export const ApplicationController = {
  createApplication,
  getAllApplicationsByJobId,
};
