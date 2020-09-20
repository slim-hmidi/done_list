import { Router } from "express";
import { addTask } from "../controllers/tasks";
import { schemaValidator } from "../middlewares";
import { addTaskSchema } from "../validations/task";

const taskRoutes = Router();

taskRoutes.route("/add")
  .post(schemaValidator(addTaskSchema), addTask);

export default taskRoutes;
