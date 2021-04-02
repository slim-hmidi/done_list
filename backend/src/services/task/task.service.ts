import { PartialModelObject } from 'objection';
import MainService from '../main/main.service';
import Task from './task.models';
import Tag from '../tag/tag.models';
import { ErrorHandler } from '@api/middlewares/errorHandler';
import { errorMessages, successMessages } from '@constants/httpUtils';
import { camelToSnakeCase, snakeToCamelCase, formatStringCase } from '@utils/index';
import { NewTask, TaskResponse, TaskToUpdate } from './task.interfaces';
import { ApiResponse } from '@@types/index';
import AuthenticationService from '../auth/auth.service';
import TaskTagService from '../task-tag/task-tag.service';

export default class TaskService extends MainService {
    private model;

    constructor() {
      super();
      this.model = Task;
    }

    public async addTask(newTask: NewTask): Promise<ApiResponse<TaskResponse>> {
      try {
        const {
          title, description, realisationDate, userId, tagId,
        } = newTask;

        const authentication = new AuthenticationService();
        const existentUser = await authentication.isExistentUser(userId);
        const existentTag = await Tag.query().findById(tagId);

        if (!existentUser) {
          throw new ErrorHandler(404, errorMessages.invalidUserId);
        }

        if (!existentTag) {
          throw new ErrorHandler(404, errorMessages.invalidTagId);
        }

        const createdTask = await this.model.transaction(async (trx) => {
          const task = await this.model.query(trx).insert({
            title,
            description,
            realisation_date: realisationDate,
            user_id: userId,
          });

          const taskTag = new TaskTagService();
          await taskTag.createTaskTagLink(task.id, tagId, trx);

          return task;
        });

        const fetchedTask = await this.model.query()
          .withGraphJoined('tags')
          .where('task.id', createdTask.id);

        return {
          message: successMessages.taskCreationSuccess,
          data: formatStringCase(snakeToCamelCase, fetchedTask[0]) as ApiResponse<TaskResponse>['data'],
        };
      } catch (error) {
        this.logger.error(error);
        throw error;
      }
    }

    public async getAllTasks(userId: number, title: string): Promise<ApiResponse<TaskResponse[]>> {
      try {
        const authentication = new AuthenticationService();
        const existentUser = await authentication.isExistentUser(userId);

        if (!existentUser) {
          throw new ErrorHandler(404, errorMessages.invalidUserId);
        }

        const fetchedTasks = await this.model.query()
          .skipUndefined()
          .withGraphJoined('tags')
          .where('user_id', userId)
          .where('title', title);

        const formattedTasks = fetchedTasks.length
          ? fetchedTasks.map((task) => formatStringCase(snakeToCamelCase, task))
          : fetchedTasks;

        return {
          message: successMessages.taskFetchSuccess,
          data: formattedTasks as ApiResponse<TaskResponse[]>['data'],
        };
      } catch (error) {
        this.logger.error(error);
        throw error;
      }
    }

    public async getOneTask(userId: number, taskId: number): Promise<ApiResponse<TaskResponse>> {
      try {
        const authentication = new AuthenticationService();
        const existentUser = await authentication.isExistentUser(userId);

        if (!existentUser) {
          throw new ErrorHandler(404, errorMessages.invalidUserId);
        }

        const fetchedTask = await this.model.query()
          .withGraphJoined('tags')
          .where('task.id', taskId);

        if (!fetchedTask.length) {
          throw new ErrorHandler(404, errorMessages.invalidTaskId);
        }
        if (fetchedTask[0].user_id !== userId) {
          throw new ErrorHandler(404, errorMessages.taskNotBelongsToUser);
        }
        return {
          message: successMessages.taskFetchSuccess,
          data: formatStringCase(snakeToCamelCase, fetchedTask[0]) as ApiResponse<TaskResponse>['data'],
        };
      } catch (error) {
        this.logger.error(error);
        throw error;
      }
    }

    public async deleteOneTask(userId: number, taskId: number):Promise<ApiResponse<{}>> {
      try {
        const authentication = new AuthenticationService();
        const existentUser = await authentication.isExistentUser(userId);
        if (!existentUser) {
          throw new ErrorHandler(404, errorMessages.invalidUserId);
        }

        const existentTask = await this.model.query().findById(taskId);
        if (!existentTask) {
          throw new ErrorHandler(404, errorMessages.invalidTaskId);
        }

        const numDeleted = await Task.query()
          .delete()
          .where('id', taskId)
          .andWhere('user_id', userId);

        if (!numDeleted) {
          throw new ErrorHandler(404, errorMessages.taskNotBelongsToUser);
        }

        return {
          message: successMessages.taskDeletionSuccess,
          data: {},
        };
      } catch (error) {
        this.logger.error(error);
        throw error;
      }
    }

    public async updateOneTask(userId: number, taskId: number, taskToUpdate: TaskToUpdate):
    Promise<ApiResponse<TaskResponse>> {
      try {
        const authentication = new AuthenticationService();
        const existentUser = await authentication.isExistentUser(userId);
        if (!existentUser) {
          throw new ErrorHandler(404, errorMessages.invalidUserId);
        }

        const existentTask = await this.model.query()
          .withGraphJoined('tags')
          .where('task.id', taskId);

        if (!existentTask.length) {
          throw new ErrorHandler(404, errorMessages.invalidTaskId);
        }
        if (userId && userId !== existentTask[0].user_id) {
          throw new ErrorHandler(400, errorMessages.updateUserNotAllowed);
        }

        const taskBody = formatStringCase(camelToSnakeCase, taskToUpdate);

        const updatedTask = await this.model.query()
          .withGraphJoined('tags')
          .patchAndFetchById(taskId, taskBody as PartialModelObject<Task>);

        Object.assign(updatedTask, { tags: existentTask[0].tags });

        return {
          message: successMessages.taskUpdateSuccess,
          data: formatStringCase(snakeToCamelCase, updatedTask) as ApiResponse<TaskResponse>['data'],
        };
      } catch (error) {
        this.logger.error(error);
        throw error;
      }
    }
}
