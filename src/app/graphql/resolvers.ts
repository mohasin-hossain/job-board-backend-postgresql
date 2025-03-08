import { ApplicationService } from '../modules/applications/applications.service';
import { JobService } from '../modules/jobs/jobs.service';

export const resolvers = {
  Query: {
    jobs: async () => await JobService.getAllJobsFromDB(),
    job: async (_: any, { id }: { id: string }) =>
      await JobService.getJobByIdFromDB(parseInt(id)),

    applications: async (_: any, { job_id }: { job_id: string }) =>
      await ApplicationService.getAllApplicationsByJobIdFromDB(
        parseInt(job_id),
      ),
  },

  Mutation: {
    createJob: async (_: any, { input }: { input: any }) =>
      await JobService.createJobIntoDB(input),

    createApplication: async (_: any, { input }: { input: any }) => {
      const job = await JobService.getJobByIdFromDB(input.job_id);
      if (!job) throw new Error('Job not found');
      return await ApplicationService.createApplicationIntoDB(input);
    },
  },

  Job: {
    applications: async (parent: any) =>
      await ApplicationService.getAllApplicationsByJobIdFromDB(parent.id),
  },
};
