import React, { createContext, useContext, useState } from "react";
import { products as initialProducts } from "./products";

// Define types
export type Product = {
  id: string;
  title: string;
  price: string;
  description: string;
  longDescription?: string;
  image: string;
  category: string;
  isBestSeller?: boolean;
  isCurated?: boolean;
};

export type Order = {
  id: string;
  customerName: string;
  date: string;
  total: string;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  items: number;
};

export type Color = {
  id: string;
  name: string;
  hex: string;
};

type AdminContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  orders: Order[];
  stats: {
    totalSales: string;
    totalOrders: number;
    avgOrderValue: string;
  };
  colors: Color[];
  addColor: (color: Color) => void;
  removeColor: (id: string) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts.map(p => ({...p, isCurated: true, isBestSeller: false}))); // Default all to curated for now to match home
  const [colors, setColors] = useState<Color[]>([
    { id: "1", name: "Blush Pink", hex: "#f97a9d" },
    { id: "2", name: "Cream White", hex: "#fdfbf7" },
    { id: "3", name: "Sky Blue", hex: "#e0f2fe" },
  ]);

  // Mock Orders
  const [orders] = useState<Order[]>([
    { id: "#ORD-7352", customerName: "Sarah Al-Sabah", date: "2024-11-28", total: "45.00 K.D.", status: "Processing", items: 3 },
    { id: "#ORD-7351", customerName: "Fatima Ali", date: "2024-11-27", total: "120.00 K.D.", status: "Completed", items: 8 },
    { id: "#ORD-7350", customerName: "Noura Ahmed", date: "2024-11-26", total: "15.00 K.D.", status: "Pending", items: 1 },
    { id: "#ORD-7349", customerName: "Maryam Khalid", date: "2024-11-25", total: "65.50 K.D.", status: "Completed", items: 4 },
  ]);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addColor = (color: Color) => {
    setColors([...colors, color]);
  };

  const removeColor = (id: string) => {
    setColors(colors.filter(c => c.id !== id));
  };

  const stats = {
    totalSales: "1,245.50 K.D.",
    totalOrders: 142,
    avgOrderValue: "32.00 K.D."
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      orders,
      stats,
      colors,
      addColor,
      removeColor
    }}>
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
