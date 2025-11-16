import mongoose from "mongoose";

const OrgSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    cacNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    address: { type: String },
    verified: { type: Boolean, default: false },
    members: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Organization's staff
    metadata: { type: Object },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Organization", OrgSchema);
