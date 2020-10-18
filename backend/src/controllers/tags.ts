import { NextFunction, Request, Response } from 'express';
import { successMessages } from '../constants/httpUtils';
import Tag from '../models/Tag';

const getAllTags = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fetchedTags = await Tag.query();

    return res.status(200).json({
      message: successMessages.tagFetchSuccess,
      data: fetchedTags,
    });
  } catch (error) {
    return next(error);
  }
};

export default getAllTags;
