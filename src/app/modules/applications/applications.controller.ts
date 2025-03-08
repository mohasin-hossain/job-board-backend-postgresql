import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ApplicationService } from './applications.service';
import { ApiError } from '../../errors/apiError';
import { checkJobExists } from '../../utils/jobHelpers';

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const { job_id } = req.body;

  // Validate Job Id
  if (!job_id || isNaN(Number(job_id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Job ID!');
  }

  // Check if job exists first
  await checkJobExists(Number(job_id));

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
    await checkJobExists(Number(jobId));

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
