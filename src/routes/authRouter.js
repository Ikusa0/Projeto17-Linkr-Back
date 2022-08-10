import { Router } from "express";
import {userSchema,loginSchema} from "./../schemas/authSchema.js";
import { signIn, signUp } from "./../controllers/authController.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";

const authRouter = Router();

authRouter.post('/signin', validateSchema(loginSchema), signIn);
authRouter.post('/signup', validateSchema(userSchema), signUp);

export default authRouter;