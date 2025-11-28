import React, { createContext, useContext, useState, useEffect } from "react";
import { productAPI, orderAPI, colorAPI, adminAPI } from "./api";

// Define types
export type Product = {
  _id?: string;
  productId: string;
  title: string;
  price: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  category: string;
  isBestSeller?: boolean;
  isCurated?: boolean;
};

export type Order = {
  _id?: string;
  orderId: string;
  customerName: string;
  createdAt?: string;
  total: string;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  items: number;
};

export type Color = {
  _id?: string;
  colorId: string;
  name: string;
  hex: string;
};

type AdminContextType = {
  isAuthenticated: boolean;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  products: Product[];
  loadProducts: () => Promise<void>;
  addProduct: (product: any) => Promise<void>;
  updateProduct: (productId: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  orders: Order[];
  loadOrders: () => Promise<void>;
  stats: {
    totalSales: string;
    totalOrders: number;
    avgOrderValue: string;
  };
  loadStats: () => Promise<void>;
  colors: Color[];
  loadColors: () => Promise<void>;
  addColor: (color: { name: string; hex: string }) => Promise<void>;
  removeColor: (colorId: string) => Promise<void>;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [stats, setStats] = useState({
    totalSales: "0.00 K.D.",
    totalOrders: 0,
    avgOrderValue: "0.00 K.D.",
  });

  // Check authentication on mount
  useEffect(() => {
    adminAPI.checkAuth().then(({ isAuthenticated }) => {
      setIsAuthenticated(isAuthenticated);
    }).catch(() => {
      setIsAuthenticated(false);
    });
  }, []);

  // Load products on mount and when authenticated
  useEffect(() => {
    loadProducts();
    loadColors();
  }, []);

  const login = async (password: string) => {
    await adminAPI.login(password);
    setIsAuthenticated(true);
    await loadOrders();
    await loadStats();
  };

  const logout = async () => {
    await adminAPI.logout();
    setIsAuthenticated(false);
    setOrders([]);
    setStats({
      totalSales: "0.00 K.D.",
      totalOrders: 0,
      avgOrderValue: "0.00 K.D.",
    });
  };

  const loadProducts = async () => {
    try {
      const data = await productAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  const addProduct = async (product: any) => {
    const created = await productAPI.create(product);
    setProducts([...products, created]);
  };

  const updateProduct = async (productId: string, updates: Partial<Product>) => {
    const updated = await productAPI.update(productId, updates);
    setProducts(products.map((p) => (p.productId === productId ? updated : p)));
  };

  const deleteProduct = async (productId: string) => {
    await productAPI.delete(productId);
    setProducts(products.filter((p) => p.productId !== productId));
  };

  const loadOrders = async () => {
    try {
      const data = await orderAPI.getAll();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  const loadColors = async () => {
    try {
      const data = await colorAPI.getAll();
      setColors(data);
    } catch (error) {
      console.error("Failed to load colors:", error);
    }
  };

  const addColor = async (color: { name: string; hex: string }) => {
    const created = await colorAPI.create(color);
    setColors([...colors, created]);
  };

  const removeColor = async (colorId: string) => {
    await colorAPI.delete(colorId);
    setColors(colors.filter((c) => c.colorId !== colorId));
  };

  const loadStats = async () => {
    try {
      const data = await adminAPI.getStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        loadOrders,
        stats,
        loadStats,
        colors,
        loadColors,
        addColor,
        removeColor,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
