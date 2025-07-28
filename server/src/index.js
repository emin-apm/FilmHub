import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import { logger } from "./middleware/logger.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/movie-hub";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//test logger middleware
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello from server...!");
});

connectDB(mongoURI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
});
