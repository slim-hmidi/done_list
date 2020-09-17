import { Router } from "express";
import userRoutes from "./users";

const routes: Router = Router();

routes.route("/")
  .get((req, res) => res.json("OK"));

routes.use("/auth", userRoutes);
export {
  routes,
};
