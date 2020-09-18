import { Router } from "express";
import { signUp } from "../controllers/auth";
import { userSchema } from "../validations/user";
import { schemaValidator } from "../middlewares";

const authRoutes = Router();

authRoutes.route("/signup")
  .post(schemaValidator(userSchema), signUp);

export default authRoutes;
