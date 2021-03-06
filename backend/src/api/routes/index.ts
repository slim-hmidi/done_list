import { Router } from 'express';
import authRoutes from '@services/auth/auth.routes';
import tagRoutes from '@services/tag/tag.routes';
import taskRoutes from '@services/task/task.routes';
import checkToken from '../middlewares/auth';

const routes: Router = Router();

routes.use('/auth', authRoutes);
routes.use('/tasks', checkToken, taskRoutes);
routes.use('/tags', tagRoutes);

export default routes;
