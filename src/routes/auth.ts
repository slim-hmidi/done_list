import { Router } from "express";
import { signUp } from "../controllers/auth";

const authRoutes = Router();

authRoutes.route("/signup")
  .post(signUp);

export default authRoutes;
