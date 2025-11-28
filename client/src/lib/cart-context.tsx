import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CustomizationDetails {
  flowerCount: number;
  pricePerFlower: number;
  selectedColors: { colorId: string; name: string; hex: string; price: number }[];
  presentation: { presentationId: string; name: string; price: number };
  addOns: { addOnId: string; name: string; price: number }[];
}

interface CartItem {
  productId: string;
  title: string;
  price: string;
  imageUrl: string;
  category: string;
  quantity: number;
  type: "catalog" | "custom";
  customization?: CustomizationDetails;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity" | "type">, quantity?: number) => void;
  addCustomToCart: (customItem: Omit<CartItem, "quantity"> & { type: "custom"; customization: CustomizationDetails }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalFormatted: () => string;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Omit<CartItem, "quantity" | "type">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.productId && item.type !== "custom");
      if (existing) {
        return prev.map((item) =>
          item.productId === product.productId && item.type !== "custom"
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, type: "catalog" as const }];
    });
  };

  const addCustomToCart = (customItem: Omit<CartItem, "quantity"> & { type: "custom"; customization: CustomizationDetails }) => {
    setItems((prev) => [...prev, { ...customItem, quantity: 1 }]);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalFormatted = () => {
    return `${getTotal().toFixed(2)} K.D.`;
  };

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        addCustomToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getTotalFormatted,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
