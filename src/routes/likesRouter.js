import { Router } from "express";

import { postLike, getLikes } from "../controllers/likesController.js";

import { validateUser, validatePost } from "../middlewares/likesMiddlewares.js";

const likesRouter = Router();

likesRouter.post("/likes/:id", validateUser, validatePost, postLike);
likesRouter.get("/likes/:id", getLikes)

export default likesRouter; 