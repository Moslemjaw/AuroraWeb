// API client for backend
import { config } from "./config";

// Ensure API base URL ends with /api if it's a full URL, or starts with /api if relative
function getApiBase(): string {
  let baseUrl = config.api.baseUrl || "";
  
  // If empty, default to /api (relative path for same domain)
  if (!baseUrl) {
    return "/api";
  }
  
  // Remove trailing slash
  baseUrl = baseUrl.replace(/\/$/, "");
  
  // If it's a full URL (starts with http), ensure it ends with /api
  if (baseUrl.startsWith("http")) {
    if (baseUrl.endsWith("/api")) {
      return baseUrl;
    }
    // Add /api if not present
    return `${baseUrl}/api`;
  }
  
  // If it's a relative path, ensure it starts with /api
  if (baseUrl.startsWith("/api")) {
    return baseUrl;
  }
  // Add /api prefix if not present
  return `/api${baseUrl.startsWith("/") ? baseUrl : `/${baseUrl}`}`;
}

const API_BASE = getApiBase();

// Debug log (remove in production)
if (typeof window !== "undefined" && import.meta.env.DEV) {
  console.log("API Base URL:", API_BASE);
}

async function apiCall(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `API call failed: ${response.statusText}`);
  }

  return response.json();
}

// Products
export const productAPI = {
  getAll: () => apiCall("/products"),
  getByProductId: (productId: string) => apiCall(`/products/${productId}`),
  create: (product: any) =>
    apiCall("/products", { method: "POST", body: JSON.stringify(product) }),
  update: (productId: string, updates: any) =>
    apiCall(`/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
  delete: (productId: string) =>
    apiCall(`/products/${productId}`, { method: "DELETE" }),
};

// Orders
export const orderAPI = {
  getAll: () => apiCall("/orders"),
  create: (order: any) =>
    apiCall("/orders", { method: "POST", body: JSON.stringify(order) }),
  update: (orderId: string, updates: any) =>
    apiCall(`/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
};

// Colors
export const colorAPI = {
  getAll: () => apiCall("/colors"),
  create: (color: any) =>
    apiCall("/colors", { method: "POST", body: JSON.stringify(color) }),
  update: (colorId: string, updates: any) =>
    apiCall(`/colors/${colorId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
  delete: (colorId: string) =>
    apiCall(`/colors/${colorId}`, { method: "DELETE" }),
};

// Presentations
export const presentationAPI = {
  getAll: () => apiCall("/presentations"),
  create: (presentation: any) =>
    apiCall("/presentations", {
      method: "POST",
      body: JSON.stringify(presentation),
    }),
  update: (presentationId: string, updates: any) =>
    apiCall(`/presentations/${presentationId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
  delete: (presentationId: string) =>
    apiCall(`/presentations/${presentationId}`, { method: "DELETE" }),
};

// Add-ons
export const addOnAPI = {
  getAll: () => apiCall("/addons"),
  create: (addOn: any) =>
    apiCall("/addons", { method: "POST", body: JSON.stringify(addOn) }),
  update: (addOnId: string, updates: any) =>
    apiCall(`/addons/${addOnId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
  delete: (addOnId: string) =>
    apiCall(`/addons/${addOnId}`, { method: "DELETE" }),
};

// Settings
export const settingsAPI = {
  get: () => apiCall("/settings"),
  update: (settings: any) =>
    apiCall("/settings", { method: "PATCH", body: JSON.stringify(settings) }),
};

// Custom Orders
export const customOrderAPI = {
  getAll: () => apiCall("/custom-orders"),
  create: (customOrder: any) =>
    apiCall("/custom-orders", {
      method: "POST",
      body: JSON.stringify(customOrder),
    }),
};

// Admin
export const adminAPI = {
  login: (password: string) =>
    apiCall("/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),
  logout: () => apiCall("/admin/logout", { method: "POST" }),
  checkAuth: () => apiCall("/admin/check"),
  getStats: () => apiCall("/admin/stats"),
};
