import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ApplicationValidation } from './applications.validation';
import { ApplicationController } from './applications.controller';

const router = Router();

// Submit A New Application
router.post(
  '/',
  validateRequest(ApplicationValidation.createApplicationValidationSchema),
  ApplicationController.createApplication,
);

// Get All Applications for a Specific Job
router.get('/:job_id', ApplicationController.getAllApplicationsByJobId);

export const ApplicationRoutes = router;
