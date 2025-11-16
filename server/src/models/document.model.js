import mongoose from "mongoose";

const TransferHistorySchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    transferredAt: { type: Date, default: Date.now },
    txRef: { type: String }, // optional transaction reference / signature id
    note: String,
  },
  { _id: false }
);

const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'receipt', 'vehicle_registration', 'land_deed'
    issuerOrg: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // current owner
    metadata: { type: Object }, // amount, serial number, property details, etc.
    fileUrl: { type: String }, // S3 link or storage key
    qrCodeData: { type: String }, // data encoded in QR (signed token or id)
    status: {
      type: String,
      enum: ["active", "expired", "revoked", "transferred"],
      default: "active",
    },
    issuedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: null },
    history: [TransferHistorySchema],
    createdAt: { type: Date, default: Date.now },
    auditId: { type: mongoose.Schema.Types.ObjectId, ref: "Audit" },
  },
  { timestamps: true }
);

DocumentSchema.index({ qrCodeData: 1 });
DocumentSchema.index({ owner: 1 });

export default mongoose.model("Document", DocumentSchema);
