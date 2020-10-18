import { Router } from 'express';
import {
  addTask,
  deleteOneTask,
  getAllTasks,
  getOneTask,
  updateOneTask,
} from '../controllers/tasks';
import { schemaUpdateValidator, schemaValidator } from '../middlewares';
import {
  addTaskSchema,
  queryTaskSchema,
  taskProps,
  taskSchema,
} from '../validations/task';

const taskRoutes = Router();

taskRoutes.route('/add').post(schemaValidator(addTaskSchema, 'body'), addTask);

taskRoutes
  .route('/')
  .get(schemaValidator(queryTaskSchema, 'query'), getAllTasks);

taskRoutes
  .route('/:id')
  .get(schemaValidator(queryTaskSchema, 'query'), getOneTask)
  .delete(schemaValidator(queryTaskSchema, 'query'), deleteOneTask)
  .patch(schemaUpdateValidator(taskSchema, taskProps), updateOneTask);

export default taskRoutes;
