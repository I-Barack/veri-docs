import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
  if (!mongoUri) throw new Error("MONGO_URI not provided");

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected!");
  } catch (e) {
    console.error("MongoDB connection failed!", e);
    process.exit(1);
  }
};

export default connectDB;
