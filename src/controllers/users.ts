import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../middlewares";
import { User } from "../models/User";
import { httpStatuscodes, errorMessages } from "../constants/httpUtils";

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, firstName, lastName, email, birthday, password } =
      req.body;

    const existantUser = await User.query()
      .where((builder) =>
        builder.where("email", email).orWhere("username", username)
      )
      .limit(1);

    if (existantUser.length) {
      throw new ErrorHandler(
        httpStatuscodes.uniqueViolationError,
        errorMessages.userExists,
      );
    }
  } catch (error) {
    next(error);
  }
};
