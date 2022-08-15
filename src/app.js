import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

//Import routes
import hashtagRouter from "./routes/hashtagRouter.js";
import likesRouter from "./routes/likesRouter.js";
import postRouter from "./routes/postRouter.js";


dotenv.config();

const app = express();
app.use(cors(), json());

//Routes
app.use(hashtagRouter);
app.use(likesRouter);
app.use(postRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
