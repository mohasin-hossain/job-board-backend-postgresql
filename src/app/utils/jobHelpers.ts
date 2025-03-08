import { JobModel } from '../modules/jobs/jobs.model';
import { ApiError } from '../errors/apiError';
import httpStatus from 'http-status';

export const checkJobExists = async (jobId: number) => {
  const job = await JobModel.getById(jobId);
  if (!job) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No job record found for the provided Job ID!',
    );
  }
  return job;
};
