import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";
import secureRouter from "./routes/secure.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

//Middlewears
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", secureRouter);
app.use("/auth", authRouter);

//Health route
app.get("/health", (req, res) => res.json({ status: "ok", time: new Date() }));

//PORT
const PORT = process.env.PORT || 4000;

// Connect to DB, then listen to app
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
  })
  .catch((err) => {
    console.error("Could not connect to DB!", err);
  });
