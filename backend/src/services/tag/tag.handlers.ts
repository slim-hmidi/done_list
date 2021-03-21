import { NextFunction, Request, Response } from 'express';
import TagService from './tag.service';

const getAllTagsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tag = new TagService();
    const { message, data } = await tag.getAllTags();

    return res.status(200).json({
      message,
      data,
    });
  } catch (error) {
    return next(error);
  }
};

export default getAllTagsHandler;
