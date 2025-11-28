import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://user:ltFRuVcClyIoJXLn@cluster0.rnndcqr.mongodb.net/fabric-blooms?retryWrites=true&w=majority";

export let isMongoConnected = false;

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    isMongoConnected = true;
    console.log("✓ MongoDB connected successfully");
  } catch (error: any) {
    console.error("MongoDB connection failed:", error.message);
    isMongoConnected = false;
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
  isMongoConnected = false;
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
  isMongoConnected = false;
});
