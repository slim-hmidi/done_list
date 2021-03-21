import { Router } from 'express';
import authRoutes from './auth';
import tagRoutes from './tags';
import taskRoutes from './tasks';
import { checkToken } from '../middlewares/auth';

const routes: Router = Router();

routes.use('/auth', authRoutes);
routes.use('/tasks', checkToken, taskRoutes);
routes.use('/tags', tagRoutes);

export default routes;
