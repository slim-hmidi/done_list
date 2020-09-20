import { Router } from "express";
import {
  addTask,
  deleteOneTask,
  getAllTasks,
  getOneTask,
} from "../controllers/tasks";
import { schemaValidator } from "../middlewares";
import { addTaskSchema, queryTaskSchema } from "../validations/task";

const taskRoutes = Router();

taskRoutes.route("/add")
  .post(schemaValidator(addTaskSchema, "body"), addTask);

taskRoutes.route("/")
  .get(schemaValidator(queryTaskSchema, "query"), getAllTasks);

taskRoutes.route("/:id")
  .get(schemaValidator(queryTaskSchema, "query"), getOneTask)
  .delete(schemaValidator(queryTaskSchema, "query"), deleteOneTask);

export default taskRoutes;
