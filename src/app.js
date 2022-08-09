import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors(), json());

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));