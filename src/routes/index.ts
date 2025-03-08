import { Router } from 'express';
import { JobRoutes } from '../modules/jobs/jobs.route';

const router = Router();

router.use('/jobs', JobRoutes);
// router.use('/applications');

export default router;
