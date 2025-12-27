// server/src/app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router.js";
import { logger } from "./middleware/logger.js";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(logger);
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello from serverless server!");
});

// Connect to MongoDB once at cold start (Vercel serverless)
const mongoURI = process.env.MONGO_URI_ATLAS;
await connectDB(mongoURI);

export default app;
