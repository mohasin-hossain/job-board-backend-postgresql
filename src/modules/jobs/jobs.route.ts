import { Router } from 'express';
import { JobController } from './jobs.controller';
import { JobValidation } from './jobs.validation';
import validateRequest from '../../middleware/validateRequest';

const router = Router();

router.post(
  '/',
  validateRequest(JobValidation.createJobValidationSchema),
  JobController.createJob,
);

export const JobRoutes = router;
