import express from "express";
import {
  verifyAccessToken,
  checkRoles,
} from "../middlewears/auth.middlewear.js";

const router = express.Router();

// Protected route
router.get("/profile", verifyAccessToken, (req, res) => {
  const payload = req.auth?.payload;
  res.json({ message: "Protected route", user: payload });
});

// Restricted example
router.get("/admin/data", verifyAccessToken, checkRoles, (req, res) =>
  res.json({ secret: "For admins only" })
);

export default router;
