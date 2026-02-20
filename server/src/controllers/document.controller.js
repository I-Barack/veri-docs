import Document from "../models/document.model.js";
import { uploadBufferToS3 } from "../services/s3.service.js";
import { generateQRCode } from "../services/qrcode.service.js";

export const createDocument = async (req, res) => {
  try {
    const { title, issuerId, metadata, expiryDate } = req.body;

    const file = req.file; // From mutler
    if (!file) return res.status(400).json({ message: "File required" });

    const fileUrl = await uploadBufferToS3(file.buffer, file.mimetype);

    const doc = await Document.create({
      title,
      owner: req.auth.payload.sub, // Later map to user._id
      issuer: issuerId,
      fileUrl,
      fileType: file.mimetype,
      metasata,
      expiryDate,
    });

    doc.qrSignature = await generateQRCode(doc._id);
    await doc.save();

    res.json({ ok: true, document: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
