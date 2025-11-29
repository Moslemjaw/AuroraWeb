import React, { createContext, useContext, useState, useEffect } from "react";
import {
  productAPI,
  orderAPI,
  colorAPI,
  presentationAPI,
  addOnAPI,
  settingsAPI,
  adminAPI,
} from "./api";

// Define types
export type Product = {
  _id?: string;
  productId: string;
  title: string;
  price: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  images?: string[];
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
  imageUrl?: string;
  price: number;
};

export type Presentation = {
  _id?: string;
  presentationId: string;
  name: string;
  description?: string;
  price: number;
};

export type AddOn = {
  _id?: string;
  addOnId: string;
  name: string;
  description?: string;
  price: number;
};

export type Settings = {
  flowerCountMin: number;
  flowerCountMax: number;
  pricePerFlower: number;
};

type AdminContextType = {
  isAuthenticated: boolean;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  products: Product[];
  loadProducts: () => Promise<void>;
  addProduct: (product: any) => Promise<void>;
  updateProduct: (
    productId: string,
    updates: Partial<Product>
  ) => Promise<void>;
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
  addColor: (color: {
    name: string;
    hex: string;
    imageUrl?: string;
    price: number;
  }) => Promise<void>;
  updateColor: (colorId: string, updates: Partial<Color>) => Promise<void>;
  removeColor: (colorId: string) => Promise<void>;
  presentations: Presentation[];
  loadPresentations: () => Promise<void>;
  addPresentation: (presentation: {
    name: string;
    description?: string;
    price: number;
  }) => Promise<void>;
  updatePresentation: (
    presentationId: string,
    updates: Partial<Presentation>
  ) => Promise<void>;
  removePresentation: (presentationId: string) => Promise<void>;
  addOns: AddOn[];
  loadAddOns: () => Promise<void>;
  addAddOn: (addOn: {
    name: string;
    description?: string;
    price: number;
  }) => Promise<void>;
  updateAddOn: (addOnId: string, updates: Partial<AddOn>) => Promise<void>;
  removeAddOn: (addOnId: string) => Promise<void>;
  settings: Settings;
  loadSettings: () => Promise<void>;
  updateSettings: (updates: Partial<Settings>) => Promise<void>;
  isLoadingProducts: boolean;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [settings, setSettings] = useState<Settings>({
    flowerCountMin: 1,
    flowerCountMax: 50,
    pricePerFlower: 5.0,
  });
  const [stats, setStats] = useState({
    totalSales: "0.00 K.D.",
    totalOrders: 0,
    avgOrderValue: "0.00 K.D.",
  });
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    adminAPI
      .checkAuth()
      .then(({ isAuthenticated }) => {
        setIsAuthenticated(isAuthenticated);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  // Load products on mount and when authenticated
  useEffect(() => {
    loadProducts();
    loadColors();
    loadPresentations();
    loadAddOns();
    loadSettings();
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

  const loadProducts = async (retries = 3) => {
    setIsLoadingProducts(true);
    for (let i = 0; i < retries; i++) {
      try {
        const data = await productAPI.getAll();
        setProducts(data || []);
        setIsLoadingProducts(false);
        return; // Success, exit retry loop
      } catch (error) {
        console.error(
          `Failed to load products (attempt ${i + 1}/${retries}):`,
          error
        );
        if (i < retries - 1) {
          // Wait before retrying (exponential backoff)
          await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        } else {
          // Last attempt failed, set empty array
          setProducts([]);
          setIsLoadingProducts(false);
        }
      }
    }
  };

  const addProduct = async (product: any) => {
    const created = await productAPI.create(product);
    setProducts([...products, created]);
  };

  const updateProduct = async (
    productId: string,
    updates: Partial<Product>
  ) => {
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

  const addColor = async (color: {
    name: string;
    hex: string;
    imageUrl?: string;
    price: number;
  }) => {
    const created = await colorAPI.create(color);
    setColors([...colors, created]);
  };

  const updateColor = async (colorId: string, updates: Partial<Color>) => {
    const updated = await colorAPI.update(colorId, updates);
    setColors(colors.map((c) => (c.colorId === colorId ? updated : c)));
  };

  const removeColor = async (colorId: string) => {
    await colorAPI.delete(colorId);
    setColors(colors.filter((c) => c.colorId !== colorId));
  };

  const loadPresentations = async () => {
    try {
      const data = await presentationAPI.getAll();
      setPresentations(data);
    } catch (error) {
      console.error("Failed to load presentations:", error);
    }
  };

  const addPresentation = async (presentation: {
    name: string;
    description?: string;
    price: number;
  }) => {
    const created = await presentationAPI.create(presentation);
    setPresentations([...presentations, created]);
  };

  const updatePresentation = async (
    presentationId: string,
    updates: Partial<Presentation>
  ) => {
    const updated = await presentationAPI.update(presentationId, updates);
    setPresentations(
      presentations.map((p) =>
        p.presentationId === presentationId ? updated : p
      )
    );
  };

  const removePresentation = async (presentationId: string) => {
    await presentationAPI.delete(presentationId);
    setPresentations(
      presentations.filter((p) => p.presentationId !== presentationId)
    );
  };

  const loadAddOns = async () => {
    try {
      const data = await addOnAPI.getAll();
      setAddOns(data);
    } catch (error) {
      console.error("Failed to load add-ons:", error);
    }
  };

  const addAddOn = async (addOn: {
    name: string;
    description?: string;
    price: number;
  }) => {
    const created = await addOnAPI.create(addOn);
    setAddOns([...addOns, created]);
  };

  const updateAddOn = async (addOnId: string, updates: Partial<AddOn>) => {
    const updated = await addOnAPI.update(addOnId, updates);
    setAddOns(addOns.map((a) => (a.addOnId === addOnId ? updated : a)));
  };

  const removeAddOn = async (addOnId: string) => {
    await addOnAPI.delete(addOnId);
    setAddOns(addOns.filter((a) => a.addOnId !== addOnId));
  };

  const loadSettings = async () => {
    try {
      const data = await settingsAPI.get();
      setSettings({
        flowerCountMin: data.flowerCountMin ?? 1,
        flowerCountMax: data.flowerCountMax ?? 50,
        pricePerFlower: data.pricePerFlower ?? 5.0,
      });
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const updateSettings = async (updates: Partial<Settings>) => {
    const updated = await settingsAPI.update(updates);
    setSettings({
      flowerCountMin: updated.flowerCountMin ?? settings.flowerCountMin,
      flowerCountMax: updated.flowerCountMax ?? settings.flowerCountMax,
      pricePerFlower: updated.pricePerFlower ?? settings.pricePerFlower,
    });
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
        updateColor,
        removeColor,
        presentations,
        loadPresentations,
        addPresentation,
        updatePresentation,
        removePresentation,
        addOns,
        loadAddOns,
        addAddOn,
        updateAddOn,
        removeAddOn,
        settings,
        loadSettings,
        updateSettings,
        isLoadingProducts,
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
