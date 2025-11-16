import express from "express";
import { verifyAccessToken } from "../middlewears/auth.middlewear.js";
import syncUserProvile from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/me", verifyAccessToken, syncUserProvile);

export default router;
