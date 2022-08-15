import { Router } from "express";

import { deleteData, getData, getDataById, postData, updateData } from "../controllers/postController.js";

import { validatePost, validateUser } from "../middlewares/postMiddleware.js";

const postRouter = Router();

postRouter.post("/posts", validateUser, postData);
postRouter.get("/posts", getData);
postRouter.get("/posts/:id", getDataById);
postRouter.delete("/posts/:id", validateUser, validatePost, deleteData);
postRouter.put("/posts/:id", validateUser, validatePost, updateData);

export default postRouter; 