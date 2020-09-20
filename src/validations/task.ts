import * as yup from "yup";
import { errorMessages } from "../constants/httpUtils";

export const addTaskSchema = yup.object().shape({
  title: yup.string().trim().required(errorMessages.titleRequired),
  description: yup.string().trim().required(errorMessages.descriptionRequired),
  realisationDate: yup.string().matches(
    /\d{4}-\d{2}-\d{2}/,
    errorMessages.dateFormatRequired,
  ).required(errorMessages.realisationDateRequired),
  userId: yup.number().positive().required(errorMessages.userIdRequired),
  tagId: yup.number().positive().required(errorMessages.tagIdRequired),
});

export const fetchAllTasksSchema = yup.object().shape({
  userId: yup.number().positive().required(errorMessages.userIdRequired),
});
