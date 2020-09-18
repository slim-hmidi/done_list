import { NextFunction, Request, Response } from "express";
import { genSaltSync, hashSync } from "bcrypt";
import { errorMessages, httpStatuscodes } from "../constants/httpUtils";
import { ErrorHandler } from "../middlewares";
import { sign } from "../utils/tokenUtils";
import { NewUser, TokenPayload } from "../interfaces/users";
import { User } from "../models/User";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const saltRound = 10;
    const { username, firstName, lastName, email, birthday, password } =
      req.body;

    const createUser: NewUser = {
      username,
      firstName,
      lastName,
      email,
      birthday,
      password,
    };

    const existantUser = await User.query()
      .where((builder) =>
        builder.where("email", email).orWhere("username", username)
      )
      .first();

    if (existantUser) {
      throw new ErrorHandler(
        httpStatuscodes.uniqueViolationError,
        errorMessages.userExists,
      );
    }

    const salt = genSaltSync(saltRound);
    const hash = hashSync(password, salt);

    const createdUser = await User.query().insert({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hash,
      username,
      birthday,
    });

    createdUser.password = "";

    const payload: TokenPayload = {
      id: createdUser.id,
      username,
      email,
    };

    const token = await sign(payload);
    return res.status(200).json({
      message: "User created successfully",
      data: token,
    });
  } catch (error) {
    next(error);
  }
};
