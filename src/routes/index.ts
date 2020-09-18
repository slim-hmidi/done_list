import { Router } from "express";
import authRoutes from "./auth";

const routes: Router = Router();

routes.route("/")
  .get((req, res) => res.json("OK"));

routes.use("/auth", authRoutes);
export {
  routes,
};
