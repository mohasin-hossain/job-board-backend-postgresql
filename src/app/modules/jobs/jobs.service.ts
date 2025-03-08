import { IJob } from './jobs.interface';
import { JobModel } from './jobs.model';

const createJobIntoDB = async (jobData: IJob): Promise<IJob> => {
  return await JobModel.create(jobData);
};

const getAllJobsFromDB = async (): Promise<IJob[]> => {
  return await JobModel.getAll();
};

const getJobByIdFromDB = async (id: number): Promise<IJob | null> => {
  return await JobModel.getById(id);
};

export const JobService = {
  createJobIntoDB,
  getAllJobsFromDB,
  getJobByIdFromDB,
};
