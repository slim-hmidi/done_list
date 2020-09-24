import { Router } from "express";
import { signUp, signIn } from "../controllers/auth";
import { signInSchema, singUpSchema } from "../validations/user";
import { schemaValidator } from "../middlewares";

const authRoutes = Router();

authRoutes.route("/signup")
  .post(schemaValidator(singUpSchema, "body"), signUp);

authRoutes.route("/signin")
  .post(schemaValidator(signInSchema, "body"), signIn);
export default authRoutes;
