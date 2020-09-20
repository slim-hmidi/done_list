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
      throw new ErrorHandler(400, errorMessages.invalidUserId);
    }

    if (!existentTag) {
      throw new ErrorHandler(400, errorMessages.invalidTagId);
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
      throw new ErrorHandler(400, errorMessages.invalidUserId);
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
