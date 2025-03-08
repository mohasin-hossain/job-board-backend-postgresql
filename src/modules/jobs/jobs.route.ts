import { Router } from 'express';
import { JobController } from './jobs.controller';
import { JobValidation } from './jobs.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

// Create A New Job
router.post(
  '/',
  validateRequest(JobValidation.createJobValidationSchema),
  JobController.createJob,
);

// Get All Jobs
router.get('/', JobController.getAllJobs);

// Get Single Job
router.get('/:id', JobController.getJobById);

export const JobRoutes = router;
