// Keep-alive service to prevent Render free tier from sleeping
// Sends a ping request to the backend every 5 minutes

import { config } from "./config";

// Get API base URL
function getApiBase(): string {
  let baseUrl = config.api.baseUrl || "";

  if (!baseUrl) {
    return "/api";
  }

  baseUrl = baseUrl.replace(/\/$/, "");

  if (baseUrl.startsWith("http")) {
    if (baseUrl.endsWith("/api")) {
      return baseUrl;
    }
    return `${baseUrl}/api`;
  }

  if (baseUrl.startsWith("/api")) {
    return baseUrl;
  }
  return `/api${baseUrl.startsWith("/") ? baseUrl : `/${baseUrl}`}`;
}

const API_BASE = getApiBase();

// Only run keep-alive if we have a backend URL on a different domain (like Render)
const shouldKeepAlive = () => {
  const baseUrl = config.api.baseUrl || "";
  // Only keep alive if:
  // 1. Backend URL is set (not empty)
  // 2. It's a full URL (starts with http)
  // 3. It's not localhost (different domain deployment)
  // 4. It contains "render.com" or "railway.app" or other external hosting
  const isExternalHost =
    baseUrl.includes("render.com") ||
    baseUrl.includes("railway.app") ||
    baseUrl.includes("herokuapp.com") ||
    (baseUrl.startsWith("http") &&
      !baseUrl.includes("localhost") &&
      !baseUrl.includes("127.0.0.1") &&
      !baseUrl.includes("vercel.app"));

  return baseUrl.length > 0 && isExternalHost;
};

let keepAliveInterval: number | null = null;

async function pingBackend() {
  // Try health endpoint first, fallback to products if health doesn't exist
  const healthUrl = `${API_BASE}/health`;
  const fallbackUrl = `${API_BASE}/products`;

  try {
    // Use lightweight health check endpoint
    const response = await fetch(healthUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // We don't care about the response, just that the request was made
    if (response.ok || response.status === 200) {
      console.log("[Keep-Alive] ✅ Ping successful (health):", healthUrl);
      return;
    } else if (response.status === 404) {
      // Health endpoint doesn't exist, try products as fallback
      console.log(
        "[Keep-Alive] Health endpoint not found, trying products endpoint..."
      );
      const fallbackResponse = await fetch(fallbackUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (fallbackResponse.ok || fallbackResponse.status === 200) {
        console.log(
          "[Keep-Alive] ✅ Ping successful (products fallback):",
          fallbackUrl
        );
      } else {
        console.warn(
          "[Keep-Alive] ⚠️ Fallback ping returned status:",
          fallbackResponse.status
        );
      }
    } else {
      console.warn(
        "[Keep-Alive] ⚠️ Ping returned status:",
        response.status,
        healthUrl
      );
    }
  } catch (error) {
    // Log errors so we can debug
    console.error("[Keep-Alive] ❌ Ping failed:", error, "URL:", healthUrl);
  }
}

export function startKeepAlive() {
  const baseUrl = config.api.baseUrl || "";

  // Log for debugging (always log, not just in dev)
  console.log("[Keep-Alive] Checking configuration...", {
    baseUrl: baseUrl || "(empty)",
    shouldKeepAlive: shouldKeepAlive(),
  });

  // Only start if backend is on a different domain
  if (!shouldKeepAlive()) {
    console.log(
      "[Keep-Alive] Skipping - backend on same domain or not configured"
    );
    return;
  }

  // Clear any existing interval
  if (keepAliveInterval !== null) {
    clearInterval(keepAliveInterval);
  }

  // Ping immediately on start
  console.log("[Keep-Alive] Starting - initial ping...");
  pingBackend();

  // Then ping every 4 minutes (240000 ms)
  // Render free tier sleeps after 15 minutes, so 4 minutes is safe and more aggressive
  keepAliveInterval = window.setInterval(() => {
    console.log("[Keep-Alive] Sending periodic ping...");
    pingBackend();
  }, 4 * 60 * 1000); // 4 minutes

  console.log(
    "[Keep-Alive] ✅ Started - pinging backend every 4 minutes at:",
    API_BASE
  );
}

export function stopKeepAlive() {
  if (keepAliveInterval !== null) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
    if (import.meta.env.DEV) {
      console.log("[Keep-Alive] Stopped");
    }
  }
}
