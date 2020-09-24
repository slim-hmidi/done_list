import { Router } from "express";
import authRoutes from "./auth";
import taskRoutes from "./tasks";
import { checkToken } from "../middlewares";

const routes: Router = Router();

routes.route("/")
  .get((req, res) => res.json("OK"));

routes.use("/auth", authRoutes);
routes.use("/tasks", checkToken, taskRoutes);

export {
  routes,
};
