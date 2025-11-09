import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/health", async (req, res) => {
  try {
    const data = req.body;
    const user = await User.create(data);
    res.json({ ok: true, user });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

export default router;
