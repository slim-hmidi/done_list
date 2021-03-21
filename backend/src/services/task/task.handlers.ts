import { NextFunction, Request, Response } from 'express';
import TaskService from './task.service';

export const addTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = new TaskService();
    const { message, data } = await task.addTask(req.body);
    return res.status(200).send({ message, data });
  } catch (error) {
    return next(error);
  }
};

export const getAllTasksHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, title } = req.query;
    const task = new TaskService();
    const { message, data } = await task.getAllTasks(
      parseInt(userId as string, 10), title as string,
    );
    return res.status(200).send({ message, data });
  } catch (error) {
    return next(error);
  }
};

export const getOneTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;
    const { id } = req.params;
    const task = new TaskService();
    const { message, data } = await task.getOneTask(
      parseInt(userId as string, 10),
      parseInt(id as string, 10),
    );
    return res.status(200).send({ message, data });
  } catch (error) {
    return next(error);
  }
};

export const deleteOneTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;
    const { id } = req.params;
    const task = new TaskService();
    const { message, data } = await task.deleteOneTask(
      parseInt(userId as string, 10),
      parseInt(id as string, 10),
    );
    return res.status(200).send({ message, data });
  } catch (error) {
    return next(error);
  }
};

export const updateOneTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    const taskToUpdate = { ...req.body };
    delete taskToUpdate.userId;
    const task = new TaskService();
    const { message, data } = await task.updateOneTask(
      userId,
      parseInt(id as string, 10),
      req.body,
    );
    return res.status(200).send({ message, data });
  } catch (error) {
    return next(error);
  }
};
