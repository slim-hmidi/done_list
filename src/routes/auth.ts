import { Router } from "express";
import { signUp, signIn } from "../controllers/auth";
import { signInSchema, singUpSchema } from "../validations/user";
import { schemaValidator } from "../middlewares";

const authRoutes = Router();

authRoutes.route("/signup")
  .post(schemaValidator(singUpSchema), signUp);

authRoutes.route("/signin")
  .post(schemaValidator(signInSchema), signIn);
export default authRoutes;
