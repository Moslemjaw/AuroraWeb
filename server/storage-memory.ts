// In-memory storage fallback when MongoDB is unavailable

interface Product {
  _id?: string;
  productId: string;
  title: string;
  price: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  category: string;
  isCurated?: boolean;
  isBestSeller?: boolean;
  createdAt?: Date;
}

interface Order {
  _id?: string;
  orderId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  total: string;
  status: string;
  items: number;
  orderData?: any;
  createdAt?: Date;
}

interface Color {
  _id?: string;
  colorId: string;
  name: string;
  hex: string;
  createdAt?: Date;
}

interface CustomOrder {
  _id?: string;
  customOrderId: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  quantity: number;
  selectedColors?: string[];
  wrappingStyle?: string;
  totalPrice: string;
  status: string;
  createdAt?: Date;
}

export class MemoryStorage {
  private products: Map<string, Product> = new Map();
  private orders: Map<string, Order> = new Map();
  private colors: Map<string, Color> = new Map();
  private customOrders: Map<string, CustomOrder> = new Map();

  constructor() {
    // Initialize with default colors
    const defaultColors = [
      { colorId: "color-1", name: "Blush Pink", hex: "#f97a9d" },
      { colorId: "color-2", name: "Cream White", hex: "#fdfbf7" },
      { colorId: "color-3", name: "Sky Blue", hex: "#e0f2fe" },
    ];
    defaultColors.forEach(color => {
      this.colors.set(color.colorId, { ...color, createdAt: new Date() });
    });

    // Add demo orders
    const demoOrders = [
      { orderId: "ORD-7352", customerName: "Sarah Al-Sabah", total: "45.00 K.D.", status: "Processing", items: 3, createdAt: new Date("2024-11-28") },
      { orderId: "ORD-7351", customerName: "Fatima Ali", total: "120.00 K.D.", status: "Completed", items: 8, createdAt: new Date("2024-11-27") },
    ];
    demoOrders.forEach(order => {
      this.orders.set(order.orderId, order);
    });
  }

  // Products
  async findProducts() {
    return Array.from(this.products.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async findProductByProductId(productId: string) {
    return this.products.get(productId) || null;
  }

  async createProduct(product: any) {
    const newProduct = { ...product, _id: Date.now().toString(), createdAt: new Date() };
    this.products.set(product.productId, newProduct);
    return newProduct;
  }

  async updateProduct(productId: string, updates: any) {
    const product = this.products.get(productId);
    if (!product) return null;
    const updated = { ...product, ...updates };
    this.products.set(productId, updated);
    return updated;
  }

  async deleteProduct(productId: string) {
    const product = this.products.get(productId);
    this.products.delete(productId);
    return product || null;
  }

  // Orders
  async findOrders() {
    return Array.from(this.orders.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createOrder(order: any) {
    const newOrder = { ...order, _id: Date.now().toString(), createdAt: new Date() };
    this.orders.set(order.orderId, newOrder);
    return newOrder;
  }

  async updateOrder(orderId: string, updates: any) {
    const order = this.orders.get(orderId);
    if (!order) return null;
    const updated = { ...order, ...updates };
    this.orders.set(orderId, updated);
    return updated;
  }

  async countOrders() {
    return this.orders.size;
  }

  // Colors
  async findColors() {
    return Array.from(this.colors.values()).sort((a, b) => 
      (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0)
    );
  }

  async createColor(color: any) {
    const newColor = { ...color, _id: Date.now().toString(), createdAt: new Date() };
    this.colors.set(color.colorId, newColor);
    return newColor;
  }

  async deleteColor(colorId: string) {
    const color = this.colors.get(colorId);
    this.colors.delete(colorId);
    return color || null;
  }

  // Custom Orders
  async findCustomOrders() {
    return Array.from(this.customOrders.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createCustomOrder(customOrder: any) {
    const newCustomOrder = { ...customOrder, _id: Date.now().toString(), createdAt: new Date() };
    this.customOrders.set(customOrder.customOrderId, newCustomOrder);
    return newCustomOrder;
  }
}

export const memoryStorage = new MemoryStorage();
