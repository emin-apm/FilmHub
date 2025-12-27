// api/index.js
import dotenv from "dotenv";
dotenv.config(); // Load env vars for Vercel

import connectDB from "../server/src/config/connectDB.js";
import app from "../server/src/app.js";

// Connect to MongoDB once at cold start
const mongoURI = process.env.MONGO_URI_ATLAS;
await connectDB(mongoURI);

export default app;
