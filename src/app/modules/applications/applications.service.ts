import { IApplication } from './applications.interface';
import { ApplicationModel } from './applications.model';

const createApplicationIntoDB = async (
  data: IApplication,
): Promise<IApplication> => {
  return await ApplicationModel.create(data);
};

const getAllApplicationsByJobIdFromDB = async (
  jobId: number,
): Promise<IApplication[]> => {
  return await ApplicationModel.getByJobId(jobId);
};

export const ApplicationService = {
  createApplicationIntoDB,
  getAllApplicationsByJobIdFromDB,
};
