import { build as esbuild } from "esbuild";
import { readFile } from "fs/promises";
import { mkdir } from "fs/promises";
import { existsSync } from "fs";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "@neondatabase/serverless",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildBackend() {
  console.log("Building backend server...");
  console.log("Current working directory:", process.cwd());

  // Ensure dist directory exists
  if (!existsSync("dist")) {
    await mkdir("dist", { recursive: true });
    console.log("Created dist directory");
  }

  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  console.log("Starting esbuild...");
  const result = await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });

  console.log("Backend build complete!");
  console.log("Output file:", "dist/index.cjs");

  // Verify the file was created
  if (existsSync("dist/index.cjs")) {
    console.log("✅ dist/index.cjs exists!");
  } else {
    console.error("❌ ERROR: dist/index.cjs was not created!");
    process.exit(1);
  }
}

buildBackend()
  .then(() => {
    console.log("✅ Build script completed successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Build failed:", err);
    console.error("Error stack:", err.stack);
    process.exit(1);
  });
