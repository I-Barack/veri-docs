import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";

const app = express();

//Middlewears
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

//Health route
app.get("/health", (req, res) => res.json({ status: ok, time: new Date() }));

//PORT
const PORT = process.env.PORT || 5000;

// Connect to DB, then listen to app
connectDB(process.env.MONGO_URI).then(
  app.listen(PORT, () =>
    console.log(`Connected to DB and listening to port ${PORT}`)
  )
);
