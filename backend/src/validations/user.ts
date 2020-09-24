import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { ErrorHandler } from "../middlewares";
import { errorMessages } from "../constants/httpUtils";
// import moment from "moment";

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const singUpSchema = yup.object().shape({
  firstName: yup.string().trim().min(2, errorMessages.minLengthRequired)
    .required(
      errorMessages.firstNameRequired,
    ),
  lastName: yup.string().trim().min(2, errorMessages.minLengthRequired)
    .required(errorMessages.lastNameRequired),
  username: yup.string().trim().min(2, errorMessages.minLengthRequired)
    .required(errorMessages.usernameRequired),
  email: yup.string().trim().email(errorMessages.emailNotValid).required(
    errorMessages.emailRequired,
  ),
  birthday: yup.string().matches(
    /\d{4}-\d{2}-\d{2}/,
    errorMessages.dateFormatRequired,
  ).required(errorMessages.birthdayRequired),
  password: yup
    .string()
    .min(8, errorMessages.passwordLengthRequired)
    .max(200)
    .matches(/[^A-Za-z0-9]/, errorMessages.specialCharacterRequired)
    .matches(/[A-Z]/, errorMessages.upperCaseCharacterRequired)
    .matches(/[a-z]/, errorMessages.lowerCaseCharacterRequired)
    .matches(/[0-9]/, errorMessages.numberRequired)
    .required(errorMessages.passwordRequired),
});

export const signInSchema = yup.object().shape({
  username: yup.string().trim().required(errorMessages.usernameRequired),
  password: yup
    .string()
    .trim()
    .required(errorMessages.passwordRequired),
});
