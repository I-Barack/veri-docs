import mongoose from "mongoose";

const TransferSchema = new mongoose.Schema({
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  fromOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requestedAt: { type: Date, default: Date.now },
  confirmedAt: { type: Date },
  status: {
    type: String,
    enum: ["pending", "completed", "rejected", "accepted", "cancelled"],
    default: "pending",
  },
  confirmationSignature: { type: String },
  note: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Transfer", TransferSchema);
