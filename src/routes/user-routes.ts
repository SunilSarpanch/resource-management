import * as express from "express";
import { authentication } from "../middlewares/authentication";
import { UserController } from "../controllers/user-controller";
import { AuthController } from "../controllers/auth-controller";
import {
  signupValidationRules,
  loginValidationRules,
  updateValidationRules,
} from "../validations/userValidation";
import { validate } from "../validations/validation";
const Router = express.Router();

Router.post(
  "/signup",
  signupValidationRules(),
  validate,
  UserController.signup
);
Router.post("/login", loginValidationRules(), validate, AuthController.login);
Router.put("/update/:id", updateValidationRules(), validate, authentication, UserController.updateUser);
Router.delete("/delete/:id", authentication, UserController.deleteUser);
export { Router as userRoutes };
