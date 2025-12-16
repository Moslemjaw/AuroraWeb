import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { connectDB } from "./db";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

app.set("trust proxy", 1);

// CORS configuration
const allowedOrigins = [
  "https://auroraflowers.vercel.app",
  "https://auroraflowerskw.vercel.app",
  "http://localhost:5000",
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        console.log("CORS: Allowing request with no origin");
        return callback(null, true);
      }

      // Allow all Vercel deployments
      if (origin.includes(".vercel.app")) {
        console.log("CORS: Allowing Vercel origin:", origin);
        return callback(null, true);
      }

      // Allow localhost for development
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        console.log("CORS: Allowing localhost origin:", origin);
        return callback(null, true);
      }

      // Check against allowed origins list
      if (allowedOrigins.includes(origin)) {
        console.log("CORS: Allowing origin from allowed list:", origin);
        callback(null, true);
      } else if (process.env.NODE_ENV === "development") {
        console.log("CORS: Allowing origin in development:", origin);
        callback(null, true);
      } else {
        console.log("CORS: Blocked origin:", origin);
        console.log("CORS: Allowed origins:", allowedOrigins);
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Handle preflight requests explicitly
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  console.log("OPTIONS preflight request from origin:", origin);

  // Check if origin is allowed
  const isAllowed =
    !origin ||
    origin.includes(".vercel.app") ||
    origin.includes("localhost") ||
    origin.includes("127.0.0.1") ||
    allowedOrigins.includes(origin) ||
    process.env.NODE_ENV === "development";

  if (isAllowed && origin) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    res.header("Access-Control-Allow-Origin", "*");
  }

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

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
      // In production, secure must be true when sameSite is "none"
      // iOS Safari requires secure: true for cross-origin cookies
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      // Safari requires "none" for cross-origin cookies, but only with secure: true
      sameSite:
        process.env.NODE_ENV === "production"
          ? ("none" as const)
          : ("lax" as const),
      // Don't set domain - let browser handle it automatically
      // iOS Safari works better without explicit domain
      path: "/", // Explicit path for Safari
    },
    // Add name to help with iOS Safari cookie issues
    name: "connect.sid",
    // Force save on every request to help with iOS Safari
    rolling: true,
  })
);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await connectDB();

  const { seedDatabase } = await import("./seed");
  await seedDatabase();

  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
