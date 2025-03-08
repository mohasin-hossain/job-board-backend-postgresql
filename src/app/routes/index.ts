import { Router } from 'express';
import { JobRoutes } from '../modules/jobs/jobs.route';
import { ApplicationRoutes } from '../modules/applications/applications.route';

const router = Router();

router.use('/jobs', JobRoutes);
router.use('/applications', ApplicationRoutes);

export default router;
