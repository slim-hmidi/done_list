import { Router } from 'express';
import {
  addTaskHandler,
  deleteOneTaskHandler,
  getAllTasksHandler,
  getOneTaskHandler,
  updateOneTaskHandler,
} from './task.handlers';
import { schemaUpdateValidator, schemaValidator } from '@api/middlewares/schemaValidators';
import {
  addTaskSchema,
  queryTaskSchema,
  taskProps,
  taskSchema,
} from '@validations/task';

const taskRoutes = Router();

taskRoutes.route('/add').post(schemaValidator(addTaskSchema, 'body'), addTaskHandler);

taskRoutes
  .route('/')
  .get(schemaValidator(queryTaskSchema, 'query'), getAllTasksHandler);

taskRoutes
  .route('/:id')
  .get(schemaValidator(queryTaskSchema, 'query'), getOneTaskHandler)
  .delete(schemaValidator(queryTaskSchema, 'query'), deleteOneTaskHandler)
  .patch(schemaUpdateValidator(taskSchema, taskProps), updateOneTaskHandler);

export default taskRoutes;
