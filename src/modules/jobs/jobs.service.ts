import { IJob } from "./jobs.interface";
import { JobModel } from "./jobs.model"

const createJobIntoDB = async(jobData: IJob) => {
    const result = await JobModel.create(jobData);
    return result;
}


export const JobService = {
    createJobIntoDB
}