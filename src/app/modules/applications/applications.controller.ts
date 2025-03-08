import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ApplicationService } from './applications.service';
import { JobModel } from '../jobs/jobs.model';
import { ApiError } from '../../errors/apiError';

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
    const jobId = Number(req.params.job_id);

    // Validate job ID
    if (isNaN(jobId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Job ID!');
    }

    // Check if job exists first
    const jobExists = await JobModel.getById(jobId);
    if (!jobExists) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'No job record found matching the provided Job ID!',
      );
    }

    const applications =
      await ApplicationService.getAllApplicationsByJobIdFromDB(jobId);

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
