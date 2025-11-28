// API client for backend
const API_BASE = "/api";

async function apiCall(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `API call failed: ${response.statusText}`);
  }

  return response.json();
}

// Products
export const productAPI = {
  getAll: () => apiCall("/products"),
  getByProductId: (productId: string) => apiCall(`/products/${productId}`),
  create: (product: any) => apiCall("/products", { method: "POST", body: JSON.stringify(product) }),
  update: (productId: string, updates: any) => apiCall(`/products/${productId}`, { method: "PATCH", body: JSON.stringify(updates) }),
  delete: (productId: string) => apiCall(`/products/${productId}`, { method: "DELETE" }),
};

// Orders
export const orderAPI = {
  getAll: () => apiCall("/orders"),
  create: (order: any) => apiCall("/orders", { method: "POST", body: JSON.stringify(order) }),
  update: (orderId: string, updates: any) => apiCall(`/orders/${orderId}`, { method: "PATCH", body: JSON.stringify(updates) }),
};

// Colors
export const colorAPI = {
  getAll: () => apiCall("/colors"),
  create: (color: any) => apiCall("/colors", { method: "POST", body: JSON.stringify(color) }),
  delete: (colorId: string) => apiCall(`/colors/${colorId}`, { method: "DELETE" }),
};

// Custom Orders
export const customOrderAPI = {
  getAll: () => apiCall("/custom-orders"),
  create: (customOrder: any) => apiCall("/custom-orders", { method: "POST", body: JSON.stringify(customOrder) }),
};

// Admin
export const adminAPI = {
  login: (password: string) => apiCall("/admin/login", { method: "POST", body: JSON.stringify({ password }) }),
  logout: () => apiCall("/admin/logout", { method: "POST" }),
  checkAuth: () => apiCall("/admin/check"),
  getStats: () => apiCall("/admin/stats"),
};
