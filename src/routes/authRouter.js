import { Router } from "express";
import {userSchema,loginSchema} from "./../schemas/authSchema.js";
import { signIn, signUp } from "./../controllers/authController.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import { validateSignIn,validateSignUp } from "../middlewares/authValidate.js";

const authRouter = Router();

authRouter.post('/sign-in', validateSchema(loginSchema),validateSignIn, signIn);
authRouter.post('/sign-up', validateSchema(userSchema), validateSignUp, signUp);

export default authRouter;