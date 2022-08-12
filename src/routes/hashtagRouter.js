import { Router } from "express";

import { getHashtags } from "../controllers/hashtagController.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag", getHashtags);

export default hashtagRouter; 