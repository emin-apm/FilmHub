// server/src/app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router.js";
import { logger } from "./middleware/logger.js";

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

// connectDB(mongoURI).then(() => {
//   app.listen(PORT, () =>
//     console.log(`🚀 Server running on port ${PORT} with Atlas DB`)
//   );
// });

export default app;
