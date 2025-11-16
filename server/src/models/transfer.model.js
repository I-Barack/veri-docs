import mongoose from "mongoose";

const TransferSchema = new mongoose.Schema(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    requestedAt: { type: Date, default: Date.now },
    confirmedAt: { type: Date },
    status: {
      type: String,
      enum: ["pending", "completed", "rejected"],
      default: "pending",
    },
    confirmationSignature: { type: String },
    note: String,
  },
  { timestamps: true }
);

export default mongoose.model("Transfer", TransferSchema);
