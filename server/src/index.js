import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import { logger } from "./middleware/logger.js";
import router from "./router.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;

const mongoURI = process.env.MONGO_URI_ATLAS;
// process.env.NODE_ENV === "production"
//   ? process.env.MONGO_URI_ATLAS
//   : process.env.MONGO_URI_LOCAL;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like Postman or server-to-server)
      if (!origin) return callback(null, true);
      // allow all other origins dynamically
      return callback(null, true);
    },
    credentials: true, // allow cookies
  })
);

//test logger middleware
app.use(logger);

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello from server...!");
});

connectDB(mongoURI).then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT} with Atlas DB`)
  );
});
