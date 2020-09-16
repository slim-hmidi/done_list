import { Router } from "express";

const routes: Router = Router();

routes.route("/")
  .get((req, res) => res.json("OK"));

export {
  routes,
};
