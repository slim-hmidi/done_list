import { Router } from "express";
import { addTask, getAllTasks, getOneTask } from "../controllers/tasks";
import { schemaValidator } from "../middlewares";
import { addTaskSchema, queryTaskSchema } from "../validations/task";

const taskRoutes = Router();

taskRoutes.route("/add")
  .post(schemaValidator(addTaskSchema, "body"), addTask);

taskRoutes.route("/")
  .get(schemaValidator(queryTaskSchema, "query"), getAllTasks);

taskRoutes.route("/:id")
  .get(schemaValidator(queryTaskSchema, "query"), getOneTask);

export default taskRoutes;
