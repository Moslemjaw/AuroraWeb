import type { VercelRequest, VercelResponse } from "@vercel/node";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { connectDB } from "../server/db";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

// Initialize Express app
const app = express();

app.set("trust proxy", 1);

// CORS configuration
const allowedOrigins = [
  "https://auroraflowerskw.vercel.app",
  "http://localhost:5000",
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Allow all Vercel preview deployments (*.vercel.app)
      if (origin.includes(".vercel.app")) {
        return callback(null, true);
      }

      // Allow localhost for development
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }

      // Check against allowed origins list
      if (
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV === "development"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const mongoUri =
  process.env.MONGODB_URI ||
  "mongodb+srv://user:ltFRuVcClyIoJXLn@cluster0.rnndcqr.mongodb.net/fabric-blooms";

app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "fabric-blooms-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoUri,
      collectionName: "sessions",
      ttl: 7 * 24 * 60 * 60,
    }),
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize app (only once)
let appInitialized = false;
let initPromise: Promise<void> | null = null;

async function initializeApp() {
  if (appInitialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      await connectDB();
      const { seedDatabase } = await import("../server/seed");
      await seedDatabase();

      // Create a dummy HTTP server for registerRoutes (not used in serverless)
      const { createServer } = await import("http");
      const httpServer = createServer(app);
      await registerRoutes(httpServer, app);

      appInitialized = true;
    } catch (error) {
      console.error("Failed to initialize app:", error);
      appInitialized = false;
      initPromise = null;
      throw error;
    }
  })();

  return initPromise;
}

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Initialize app on first request
  await initializeApp();

  // Convert Vercel request/response to Express format
  return new Promise<void>((resolve) => {
    app(req as any, res as any, () => {
      resolve();
    });
  });
}
