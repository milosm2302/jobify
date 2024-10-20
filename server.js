import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";

import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//public

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import mongoose from "mongoose";
import errorHandler from "./middleware/errorHandler.js";

//middleware
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());
//cookie middleware
app.use(cookieParser());
//middleware

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

//test route
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandler);

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
