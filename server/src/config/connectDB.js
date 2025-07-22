import mongoose from "mongoose";

const connectDB = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB not connected:", error);
    process.exit(1);
  }
};

export default connectDB;
