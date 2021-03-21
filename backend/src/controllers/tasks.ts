import { Request, Response, NextFunction } from 'express';
import Task from '../models/Task';
import Tag from '../models/Tag';
import TaskTag from '../models/TaskTag';
import User from '../models/User';
import { ErrorHandler } from '../api/middlewares/errorHandler';
import { errorMessages, successMessages } from '../constants/httpUtils';
import { snakeToCamelCase, formatStringCase } from '../utils/index';

export const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title, description, realisationDate, userId, tagId,
    } = req.body;

    const existentUser = await User.query().findById(userId);
    const existentTag = await Tag.query().findById(tagId);

    if (!existentUser) {
      throw new ErrorHandler(404, errorMessages.invalidUserId);
    }

    if (!existentTag) {
      throw new ErrorHandler(404, errorMessages.invalidTagId);
    }

    const createdTask = await Task.transaction(async (trx) => {
      const task = await Task.query(trx).insert({
        title,
        description,
        realisation_date: realisationDate,
        user_id: userId,
      });

      await TaskTag.query(trx).insert({
        task_id: task.id,
        tag_id: tagId,
      });

      return task;
    });

    const fetchedTask = await Task.query()
      .withGraphJoined('tags')
      .where('task.id', createdTask.id);

    return res.status(200).json({
      message: successMessages.taskCreationSuccess,
      data: formatStringCase(snakeToCamelCase, fetchedTask[0]),
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, title } = req.query;

    const existentUser = await User.query().findById(
      parseInt(userId as string, 10),
    );

    if (!existentUser) {
      throw new ErrorHandler(404, errorMessages.invalidUserId);
    }

    const fetchedTasks = await Task.query()
      .skipUndefined()
      .withGraphJoined('tags')
      .where('user_id', userId as string)
      .where('title', title as string);

    const formattedTasks = fetchedTasks.length
      ? fetchedTasks.map((task) => formatStringCase(snakeToCamelCase, task))
      : fetchedTasks;

    return res.status(200).json({
      message: successMessages.taskFetchSuccess,
      data: formattedTasks,
    });
  } catch (error) {
    return next(error);
  }
};

export const getOneTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.query;
    const { id } = req.params;

    const existentUser = await User.query().findById(
      parseInt(userId as string, 10),
    );

    if (!existentUser) {
      throw new ErrorHandler(404, errorMessages.invalidUserId);
    }

    const fetchedTask = await Task.query()
      .withGraphJoined('tags')
      .where('task.id', id);

    if (!fetchedTask.length) {
      throw new ErrorHandler(404, errorMessages.invalidTaskId);
    }
    if (fetchedTask[0].user_id !== parseInt(userId as string, 10)) {
      throw new ErrorHandler(404, errorMessages.taskNotBelongsToUser);
    }
    return res.status(200).json({
      message: successMessages.taskFetchSuccess,
      data: formatStringCase(snakeToCamelCase, fetchedTask[0]),
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteOneTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.query;
    const { id } = req.params;

    const existentUser = await User.query().findById(
      parseInt(userId as string, 10),
    );
    if (!existentUser) {
      throw new ErrorHandler(404, errorMessages.invalidUserId);
    }

    const existentTask = await Task.query().findById(id);
    if (!existentTask) {
      throw new ErrorHandler(404, errorMessages.invalidTaskId);
    }

    const numDeleted = await Task.query()
      .delete()
      .where('id', id)
      .andWhere('user_id', parseInt(userId as string, 10));

    if (!numDeleted) {
      throw new ErrorHandler(404, errorMessages.taskNotBelongsToUser);
    }

    return res.status(200).json({
      message: successMessages.taskDeletionSuccess,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateOneTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const existentTask = await Task.query()
      .withGraphJoined('tags')
      .where('task.id', id);

    if (!existentTask.length) {
      throw new ErrorHandler(404, errorMessages.invalidTaskId);
    }
    if (req.body.userId && req.body.userId !== existentTask[0].user_id) {
      throw new ErrorHandler(400, errorMessages.updateUserNotAllowed);
    }

    req.body = formatStringCase(snakeToCamelCase, req.body);

    const updatedTask = await Task.query()
      .withGraphJoined('tags')
      .patchAndFetchById(id, req.body);

    Object.assign(updatedTask, { tags: existentTask[0].tags });

    return res.status(200).json({
      message: successMessages.taskUpdateSuccess,
      data: formatStringCase(snakeToCamelCase, updatedTask),
    });
  } catch (error) {
    return next(error);
  }
};
