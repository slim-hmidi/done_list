import { Router } from "express";
import { addTask, getAllTasks } from "../controllers/tasks";
import { schemaValidator } from "../middlewares";
import { addTaskSchema, fetchAllTasksSchema } from "../validations/task";

const taskRoutes = Router();

taskRoutes.route("/add")
  .post(schemaValidator(addTaskSchema, "body"), addTask);

taskRoutes.route("/")
  .get(schemaValidator(fetchAllTasksSchema, "query"), getAllTasks);

export default taskRoutes;
