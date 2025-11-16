import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    nationalID: { type: String, required: true, unique: true }, // BVN, NIN or similar
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    authProvider: {
      provider: { type: String }, // Google, auth0, or similar
      providerID: { type: String },
    },
    roles: [
      {
        type: String,
        enum: ["individual", "admin", "officer", "organization_admin"],
      },
    ],
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },
    verified: { type: Boolean, default: false }, // Verified by government data
    metadata: { type: Object }, // Extra profile data. eg DOB, Address
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
