import { ApplicationService } from '../modules/applications/applications.service';
import { JobService } from '../modules/jobs/jobs.service';
import {
  IApplicationArgs,
  ICreateApplicationArgs,
  ICreateJobArgs,
  IJobArgs,
} from './graphql.interface';

export const resolvers = {
  Query: {
    jobs: async () => {
      return await JobService.getAllJobsFromDB();
    },

    job: async (_unused: any, args: IJobArgs) => {
      return await JobService.getJobByIdFromDB(parseInt(args.id));
    },

    applications: async (_unused: any, args: IApplicationArgs) => {
      return await ApplicationService.getAllApplicationsByJobIdFromDB(
        parseInt(args.job_id),
      );
    },
  },

  Mutation: {
    createJob: async (_unused: any, args: ICreateJobArgs) => {
      return await JobService.createJobIntoDB(args.input);
    },

    createApplication: async (_unused: any, args: ICreateApplicationArgs) => {
      const job = await JobService.getJobByIdFromDB(args.input.job_id);
      if (!job) throw new Error('Job not found');

      return await ApplicationService.createApplicationIntoDB(args.input);
    },
  },

  Job: {
    applications: async (parent: any) => {
      return await ApplicationService.getAllApplicationsByJobIdFromDB(
        parent.id,
      );
    },
  },
};
