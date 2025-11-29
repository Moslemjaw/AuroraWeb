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
  return (
    baseUrl.length > 0 &&
    baseUrl.startsWith("http") &&
    !baseUrl.includes("localhost") &&
    !baseUrl.includes("127.0.0.1")
  );
};

let keepAliveInterval: number | null = null;

async function pingBackend() {
  try {
    // Use lightweight health check endpoint
    const response = await fetch(`${API_BASE}/health`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // We don't care about the response, just that the request was made
    if (response.ok || response.status === 200) {
      if (import.meta.env.DEV) {
        console.log("[Keep-Alive] Backend ping successful");
      }
    }
  } catch (error) {
    // Silently fail - we don't want to spam errors
    if (import.meta.env.DEV) {
      console.warn("[Keep-Alive] Ping failed:", error);
    }
  }
}

export function startKeepAlive() {
  // Only start if backend is on a different domain
  if (!shouldKeepAlive()) {
    if (import.meta.env.DEV) {
      console.log("[Keep-Alive] Skipping - backend on same domain");
    }
    return;
  }

  // Clear any existing interval
  if (keepAliveInterval !== null) {
    clearInterval(keepAliveInterval);
  }

  // Ping immediately on start
  pingBackend();

  // Then ping every 5 minutes (300000 ms)
  // Render free tier sleeps after 15 minutes, so 5 minutes is safe
  keepAliveInterval = window.setInterval(() => {
    pingBackend();
  }, 5 * 60 * 1000); // 5 minutes

  if (import.meta.env.DEV) {
    console.log("[Keep-Alive] Started - pinging backend every 5 minutes");
  }
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
