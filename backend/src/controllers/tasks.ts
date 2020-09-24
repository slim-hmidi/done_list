import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";
import Tag from "../models/TaskTag";
import TaskTag from "../models/TaskTag";
import User from "../models/User";
import { ErrorHandler } from "../middlewares";
import { errorMessages, successMessages } from "../constants/httpUtils";

export const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, realisationDate, userId, tagId } = req.body;

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

    return res.status(200).json({
      message: successMessages.taskCreationSuccess,
      data: createdTask,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.query;

    const existentUser = await User.query().findById(
      parseInt(userId as string, 10),
    );

    if (!existentUser) {
      throw new ErrorHandler(404, errorMessages.invalidUserId);
    }

    const fetchedTasks = await Task.query().where("user_id", userId as string);

    return res.status(200).json({
      message: successMessages.taskFetchSuccess,
      data: fetchedTasks,
    });
  } catch (error) {
    next(error);
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

    const fetchedTask = await Task.query().findById(id);

    if (!fetchedTask) {
      throw new ErrorHandler(404, errorMessages.invalidTaskId);
    }
    if (fetchedTask.user_id !== parseInt(userId as string, 10)) {
      throw new ErrorHandler(404, errorMessages.taskNotBelongsToUser);
    }
    return res.status(200).json({
      message: successMessages.taskFetchSuccess,
      data: fetchedTask,
    });
  } catch (error) {
    next(error);
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

    const numDeleted = await Task.query().delete()
      .where("id", id)
      .andWhere(
        "user_id",
        parseInt(userId as string, 10),
      );

    if (!numDeleted) {
      throw new ErrorHandler(404, errorMessages.taskNotBelongsToUser);
    }

    return res.status(200).json({
      message: successMessages.taskDeletionSuccess,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOneTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const existentTask = await Task.query().findById(id);

    if (!existentTask) {
      throw new ErrorHandler(404, errorMessages.invalidTaskId);
    }
    if (req.body.userId && req.body.userId !== existentTask.user_id) {
      throw new ErrorHandler(400, errorMessages.updateUserNotAllowed);
    }

    if (req.body.hasOwnProperty("realisationDate")) {
      req.body.realisation_date = req.body.realisationDate;
      delete req.body.realisationDate;
    }

    const updatedTask = await Task.query().patchAndFetchById(id, req.body);

    return res.status(200).json({
      message: successMessages.taskUpdateSuccess,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};
