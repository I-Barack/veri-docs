import mongoose from "mongoose";

const AuditSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g., 'issue_document', 'transfer', 'revoke'
  actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who did it
  target: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
  details: { type: Object },
  timestamp: { type: Date, default: Date.now },
  ip: String,
});

export default mongoose.model("Audit", AuditSchema);
