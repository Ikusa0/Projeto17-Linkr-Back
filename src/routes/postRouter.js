import { Router } from "express";

import { getData, postData } from "../controllers/postController.js";

import { validateUser } from "../middlewares/postMiddleware.js";

const postRouter = Router();

postRouter.post("/posts", validateUser, postData);
postRouter.get("/posts", getData);

export default postRouter;