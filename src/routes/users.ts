import { Router } from "express";
import { signUp } from "../controllers/users";

const userRoutes = Router();

userRoutes.route("/signUp")
  .post(signUp);

export default userRoutes;
