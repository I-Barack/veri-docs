import express from "express";
import Document from "../models/document.model.js";

const router = express.Router();

// No token required
router.get("/:id", async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) return res.status(404).json({ valid: false });

  const isExpired = doc.expiryDate && new Date() > doc.expiryDate;

  res.json({
    valid: !isExpired && doc.status === "active",
    status: doc.status,
    expired: isExpired,
    owner: doc.issuer,
    metadata: doc.metadata,
  });
});

export default router;
