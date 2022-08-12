import { Router } from "express";

import { getHashtagById, getHashtags } from "../controllers/hashtagController.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag", getHashtags);
hashtagRouter.get("/hashtag/:id", getHashtagById);

export default hashtagRouter;