import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Try multiple possible paths for the frontend build
  const possiblePaths = [
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(__dirname, "..", "dist", "public"),
    path.resolve(__dirname, "public"),
  ];

  let distPath: string | null = null;
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      distPath = possiblePath;
      break;
    }
  }

  // If frontend build doesn't exist (e.g., backend-only deployment), skip static serving
  if (!distPath) {
    console.log(
      "⚠️  Frontend build not found - skipping static file serving (backend-only mode)"
    );
    // Return 404 for non-API routes instead of throwing
    app.use((req, res, next) => {
      if (!req.path.startsWith("/api")) {
        return res
          .status(404)
          .json({ error: "Not found - frontend not deployed with backend" });
      }
      next();
    });
    return;
  }

  console.log(`✅ Serving static files from: ${distPath}`);
  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath!, "index.html"));
  });
}
