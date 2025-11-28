import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://user:ltFRuVcClyIoJXLn@cluster0.rnndcqr.mongodb.net/fabric-blooms?retryWrites=true&w=majority";

export let isMongoConnected = false;

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    isMongoConnected = true;
    console.log("✓ MongoDB connected successfully");
  } catch (error: any) {
    console.warn("⚠ MongoDB connection failed - using in-memory storage");
    console.warn("To connect MongoDB Atlas, whitelist Replit's IP (0.0.0.0/0) in Network Access");
    isMongoConnected = false;
    // Don't exit - continue with in-memory fallback
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
